"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// === Storage Keys ===
const STORAGE_KEYS = {
  currentUser: "auth_user",
  registeredUsers: "registered_users",
};

// === สร้าง Context ===
const AuthContext = createContext();

// === Custom Hook สำหรับใช้งาน AuthContext ===
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

// === AuthProvider Component ===
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // === Effect: ตรวจสอบ Authentication เมื่อ Component Mount ===
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.currentUser);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to load auth state:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // === ฟังก์ชัน: Register (สมัครสมาชิก) ===
  const register = async (email, password, name) => {
    try {
      // เรียก API เพื่อสร้าง user ใหม่
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      // Login อัตโนมัติหลังสมัคร
      const userWithoutPassword = data.user;
      localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(userWithoutPassword));
      setCurrentUser(userWithoutPassword);
      setIsAuthenticated(true);

      return { success: true, message: "Registration successful" };
    } catch (error) {
      console.error("Registration failed:", error);
      return { success: false, message: "Registration failed" };
    }
  };

  // === ฟังก์ชัน: Login (เข้าสู่ระบบ) ===
  const login = async (email, password) => {
    try {
      // เรียก API เพื่อตรวจสอบ credentials
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, action: "login" }),
      });

      const data = await response.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      // บันทึก session (ไม่เก็บ password)
      const userWithoutPassword = data.user;
      localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(userWithoutPassword));
      setCurrentUser(userWithoutPassword);
      setIsAuthenticated(true);

      return { success: true, message: "Login successful" };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, message: "Login failed" };
    }
  };

  // === ฟังก์ชัน: Logout (ออกจากระบบ) ===
  const logout = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.currentUser);
      setCurrentUser(null);
      setIsAuthenticated(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // === Value ที่จะส่งไปให้ Context ===
  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


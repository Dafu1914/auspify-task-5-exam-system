import { Request, Response } from 'express';
import User from '../models/User';

// Register (for testing)
export const register = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).json({ success: false, error: 'Invalid credentials' });
    res.status(200).json({ success: true, data: { username: user.username } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
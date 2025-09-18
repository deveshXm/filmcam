import { User, IUser } from '../models/User';

export class UserService {
  async findOrCreateUser(googleProfile: {
    id: string;
    email: string;
    name: string;
  }): Promise<IUser> {
    let user = await User.findOne({ googleId: googleProfile.id });
    
    if (!user) {
      user = new User({
        googleId: googleProfile.id,
        email: googleProfile.email,
        name: googleProfile.name,
        tier: 'free',
        imageCount: 0,
      });
      await user.save();
    }
    
    return user;
  }

  async getUserById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async incrementImageCount(userId: string): Promise<IUser | null> {
    return User.findByIdAndUpdate(
      userId,
      { $inc: { imageCount: 1 } },
      { new: true }
    );
  }

  async upgradeToPremium(userId: string): Promise<IUser | null> {
    return User.findByIdAndUpdate(
      userId,
      { 
        tier: 'premium',
        imageCount: 0 // Reset count, they now have 100 limit
      },
      { new: true }
    );
  }

  async canProcessImage(userId: string): Promise<{ canProcess: boolean; remaining: number }> {
    const user = await User.findById(userId);
    if (!user) {
      return { canProcess: false, remaining: 0 };
    }

    const limit = user.tier === 'premium' ? 100 : 5;
    const remaining = Math.max(0, limit - user.imageCount);
    
    return {
      canProcess: remaining > 0,
      remaining
    };
  }
}

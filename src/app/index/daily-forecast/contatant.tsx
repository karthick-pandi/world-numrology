
import React from 'react';
import { 
  BarChart2, 
  Users, 
  Calendar, 
  Diamond, 
  Heart, 
  Zap, 
  Compass, 
  UserPlus, 
  Mail, 
  Phone, 
  Home, 
  Target
} from 'lucide-react';

export const COLORS = {
  primary: '#C01D33', // Deep Red
  secondary: '#F58220', // Orange
  dark: '#2D1B5E', // Purple-Blue
  green: '#548235', // Table Green Header
  lightGrey: '#E9ECEF',
};

export const READING_CARDS = [
  { id: 'daily', title: 'DAILY FORECAST', icon: <Calendar className="w-8 h-8" />, color: 'bg-[#F58220]', value:"dailyforecast" },
  { id: 'free', title: 'FREE 8-PAGE READINGS', icon: <Diamond className="w-8 h-8" />, color: 'bg-[#F58220]', value:"getreports" },
  { id: 'personality', title: 'PERSONALITY PROFILE', icon: <Target className="w-8 h-8" />, color: 'bg-gray-400', value:"personalityprofile" },
  { id: 'yearly', title: 'YEARLY AND MONTHLY FORECAST', icon: <BarChart2 className="w-8 h-8" />, color: 'bg-gray-400', value:"yearlyandmonthlyforecast" },
  { id: 'diamond', title: 'DIAMOND SPIRIT READING', icon: <Compass className="w-8 h-8" />, color: 'bg-gray-400', value:"diamondspiritreading" },
  { id: 'relationship', title: 'RELATIONSHIP PROFILE', icon: <Heart className="w-8 h-8" />, color: 'bg-gray-400', value:"relationshipprofile" },
  { id: 'monthly_rel', title: 'MONTHLY RELATIONSHIP FORECAST', icon: <Zap className="w-8 h-8" />, color: 'bg-gray-400', value:"monthlyrelationshipforecast" },
  { id: 'yearly_rel', title: 'YEARLY RELATIONSHIP FORECAST', icon: <Users className="w-8 h-8" />, color: 'bg-gray-400', value:"yearlyrelationshipforecast" },
  { id: 'talent', title: 'TALENT PROFILE', icon: <Diamond className="w-8 h-8" />, color: 'bg-gray-400', value:"talentprofile" },
  { id: 'lucky', title: 'LUCKY NUMBERS', icon: <Target className="w-8 h-8" />, color: 'bg-gray-400', value:"luckynumbers" },
  { id: 'inner', title: 'INNER REFLECTION', icon: <Target className="w-8 h-8" />, color: 'bg-gray-400', value:"innerreflection" },
  { id: 'ancestral', title: 'ANCESTRAL INFLUENCES', icon: <Zap className="w-8 h-8" />, color: 'bg-gray-400', value:"ancestralinfluences" },
  { id: 'business', title: 'BUSINESS NAME ANALYZER', icon: <Home className="w-8 h-8" />, color: 'bg-gray-400', value:"businessnameanalyzer" },
  { id: 'name', title: 'NAME ANALYZER FOR PEOPLE', icon: <UserPlus className="w-8 h-8" />, color: 'bg-gray-400', value:"nameanalyzerforpeople" },
  { id: 'address', title: 'ADDRESS ANALYZER', icon: <Home className="w-8 h-8" />, color: 'bg-gray-400', value:"addressanalyzer" },
  { id: 'phone', title: 'PHONE NUMBER ANALYZER', icon: <Phone className="w-8 h-8" />, color: 'bg-gray-400', value:"phonenumberanalyzer" },
];

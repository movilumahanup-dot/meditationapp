import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Crown, Star, Check } from 'lucide-react';

interface User {
  isPremium: boolean;
}

interface MobilePremiumProps {
  user: User;
  selectedPlan: string | null;
  onUpgrade: (planType: string, price: string) => void;
  onCancel: () => void;
}

export function MobilePremium({ user, selectedPlan, onUpgrade, onCancel }: MobilePremiumProps) {
  if (user.isPremium) {
    return (
      <div className="space-y-6">
        <div className="text-center py-6">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <Crown className="h-10 w-10" />
          </div>
          <h2 className="text-2xl mb-4">Welcome to Premium!</h2>
          <p className="text-gray-600 text-sm mb-6">You now have access to all exclusive content</p>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-base">
                <Crown className="h-5 w-5 text-yellow-500" />
                Current Plan: {selectedPlan || "Premium"}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                variant="outline" 
                onClick={onCancel}
                className="text-red-600 border-red-600 hover:bg-red-50 h-12 w-full"
              >
                Cancel Subscription
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Premium Benefits */}
        <div className="space-y-4">
          <Card className="text-center">
            <CardHeader className="pb-3">
              <Check className="h-8 w-8 text-green-500 mx-auto" />
              <CardTitle className="text-base">Unlimited Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Access to all guided meditations without restrictions</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-3">
              <Check className="h-8 w-8 text-green-500 mx-auto" />
              <CardTitle className="text-base">Premium Music</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Extended library of high-quality meditation music</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-3">
              <Check className="h-8 w-8 text-green-500 mx-auto" />
              <CardTitle className="text-base">Advanced Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Detailed progress tracking and insights</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-3">
              <Check className="h-8 w-8 text-green-500 mx-auto" />
              <CardTitle className="text-base">Priority Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Get help faster with premium customer support</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center py-6">
        <Crown className="h-16 w-16 mx-auto mb-4 text-yellow-500" />
        <h2 className="text-2xl mb-4">Upgrade to Premium</h2>
        <p className="text-gray-600 text-sm mb-6">Unlock exclusive content and advanced features</p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Beginner Premium</CardTitle>
            <CardDescription className="text-sm">Perfect for starting your journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xl mb-4">$4.99/month</div>
            <ul className="space-y-2 text-sm mb-4">
              <li>• 20+ guided meditations</li>
              <li>• Basic breathing exercises</li>
              <li>• Progress tracking</li>
              <li>• Ad-free experience</li>
            </ul>
            <Button 
              className="w-full h-12"
              onClick={() => onUpgrade("Beginner Premium", "$4.99/month")}
            >
              Choose Plan
            </Button>
          </CardContent>
        </Card>

        <Card className="border-yellow-500 border-2 relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-yellow-500 text-white text-xs">Most Popular</Badge>
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              Intermediate Premium
              <Star className="h-4 w-4 text-yellow-500" />
            </CardTitle>
            <CardDescription className="text-sm">Most popular choice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xl mb-4">$9.99/month</div>
            <ul className="space-y-2 text-sm mb-4">
              <li>• 50+ guided meditations</li>
              <li>• Advanced breathing techniques</li>
              <li>• Detailed analytics</li>
              <li>• Sleep stories</li>
              <li>• Premium music library</li>
            </ul>
            <Button 
              className="w-full h-12"
              onClick={() => onUpgrade("Intermediate Premium", "$9.99/month")}
            >
              Choose Plan
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Advanced Premium</CardTitle>
            <CardDescription className="text-sm">For serious practitioners</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xl mb-4">$14.99/month</div>
            <ul className="space-y-2 text-sm mb-4">
              <li>• 100+ guided meditations</li>
              <li>• Master-level techniques</li>
              <li>• Personal coaching</li>
              <li>• Live sessions</li>
              <li>• Early access to new content</li>
            </ul>
            <Button 
              className="w-full h-12"
              onClick={() => onUpgrade("Advanced Premium", "$14.99/month")}
            >
              Choose Plan
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* What You Get Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">What You Get with Premium</CardTitle>
          <CardDescription className="text-sm">Transform your meditation practice with exclusive features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">Unlimited access to all guided meditations</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">Premium-only sleep stories and music</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">Advanced progress analytics and insights</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">Ad-free meditation experience</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">Priority customer support</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">Early access to new content</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">Personalized meditation recommendations</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">Offline downloads for mobile use</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
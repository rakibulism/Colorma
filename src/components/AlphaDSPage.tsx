import React, { useState } from 'react';
import { Button } from './ui/button';
import { Star, ArrowRight, Play, Check, TrendingUp, Users, Zap, Shield, Layers, Code2, Palette, Calendar as CalendarIcon, MessageSquare, BarChart3, Download, Sparkles, Box, Component } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Calendar } from './ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { AreaChart, Area, BarChart, Bar, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

interface AlphaDSPageProps {
  textColor: string;
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export function AlphaDSPage({ textColor, backgroundColor, primaryColor, secondaryColor, accentColor }: AlphaDSPageProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [sliderValue, setSliderValue] = useState([50]);
  
  // Sample data for charts
  const chartData = [
    { name: 'Jan', value: 400, growth: 240 },
    { name: 'Feb', value: 300, growth: 139 },
    { name: 'Mar', value: 500, growth: 380 },
    { name: 'Apr', value: 280, growth: 390 },
    { name: 'May', value: 450, growth: 480 },
    { name: 'Jun', value: 600, growth: 380 },
  ];

  const pieData = [
    { name: 'Design', value: 400 },
    { name: 'Development', value: 300 },
    { name: 'Marketing', value: 200 },
    { name: 'Sales', value: 278 },
  ];

  return (
    <>
      {/* Hero Section with Design System Announcement */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-5xl mx-auto space-y-6">
          <Badge className="mb-4" style={{ backgroundColor: accentColor, color: backgroundColor, borderRadius: 'var(--radius)' }}>
            <Sparkles className="w-3 h-3 mr-1" />
            Built with Alpha UI Design System
          </Badge>
          <h1 style={{ color: textColor }}>
            Experience the Power of Alpha UI
          </h1>
          <p className="mx-auto max-w-2xl" style={{ color: textColor, opacity: 0.8 }}>
            This entire website is built using <strong>Alpha UI Design System & UI Kit</strong> — a pre-internal test of the <strong>Seen Design System</strong>. 
            Test colors in real-time and see how a complete design system adapts to your palette.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button
              className="gap-2 border-0"
              style={{ backgroundColor: primaryColor, color: backgroundColor }}
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2"
                  style={{ borderColor: primaryColor, color: primaryColor, backgroundColor: 'transparent' }}
                >
                  <Play className="w-4 h-4" />
                  Watch Demo
                </Button>
              </DialogTrigger>
              <DialogContent style={{ backgroundColor, borderColor: secondaryColor }}>
                <DialogHeader>
                  <DialogTitle style={{ color: textColor }}>Alpha UI Design System</DialogTitle>
                  <DialogDescription style={{ color: textColor, opacity: 0.8 }}>
                    A comprehensive design system with pre-built components, tokens, and guidelines.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <p style={{ color: textColor }}>
                    The Alpha UI Design System is a pre-internal test of the Seen Design System, 
                    featuring modern components, accessibility-first approach, and seamless integration 
                    between design and code.
                  </p>
                  <div className="flex gap-2">
                    <Badge style={{ backgroundColor: secondaryColor, color: primaryColor }}>50+ Components</Badge>
                    <Badge style={{ backgroundColor: secondaryColor, color: primaryColor }}>Design Tokens</Badge>
                    <Badge style={{ backgroundColor: secondaryColor, color: primaryColor }}>WCAG AAA</Badge>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Design System Showcase */}
      <section className="px-6 py-16" style={{ backgroundColor: secondaryColor }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ color: textColor }}>Powered by Alpha UI Design System</h2>
            <p style={{ color: textColor, opacity: 0.8 }}>A pre-internal test of the Seen Design System</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Component, title: '50+ Components', desc: 'Pre-built, customizable components ready to use' },
              { icon: Palette, title: 'Design Tokens', desc: 'Consistent spacing, colors, typography across all components' },
              { icon: Code2, title: 'Code Integration', desc: 'Seamless Figma to code workflow with our UI kit' },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} style={{ backgroundColor, borderColor: secondaryColor }}>
                  <CardHeader className="p-[24px]">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: accentColor, borderRadius: '50%' }}
                    >
                      <Icon className="w-6 h-6" style={{ color: backgroundColor }} />
                    </div>
                    <CardTitle style={{ color: textColor }}>{item.title}</CardTitle>
                    <CardDescription style={{ color: textColor, opacity: 0.8 }}>{item.desc}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Components Showcase */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ color: textColor }}>Interactive Components</h2>
            <p style={{ color: textColor, opacity: 0.8 }}>Try out our design system components with your colors</p>
          </div>
          
          <Tabs defaultValue="buttons" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8" style={{ backgroundColor: secondaryColor }}>
              <TabsTrigger value="buttons" style={{ color: textColor }}>Buttons</TabsTrigger>
              <TabsTrigger value="forms" style={{ color: textColor }}>Forms</TabsTrigger>
              <TabsTrigger value="data" style={{ color: textColor }}>Data Display</TabsTrigger>
              <TabsTrigger value="feedback" style={{ color: textColor }}>Feedback</TabsTrigger>
            </TabsList>
            
            <TabsContent value="buttons" className="space-y-6">
              <Card style={{ backgroundColor, borderColor: secondaryColor }}>
                <CardHeader>
                  <CardTitle style={{ color: textColor }}>Button Variants</CardTitle>
                  <CardDescription style={{ color: textColor, opacity: 0.8 }}>
                    Various button styles from Alpha UI Design System
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <Button style={{ backgroundColor: primaryColor, color: backgroundColor }} className="border-0">
                      Primary Button
                    </Button>
                    <Button style={{ backgroundColor: accentColor, color: backgroundColor }} className="border-0">
                      Accent Button
                    </Button>
                    <Button variant="outline" style={{ borderColor: primaryColor, color: primaryColor }}>
                      Outline Button
                    </Button>
                    <Button variant="ghost" style={{ color: textColor }}>
                      Ghost Button
                    </Button>
                  </div>
                  <Separator style={{ backgroundColor: secondaryColor }} />
                  <div className="flex flex-wrap gap-3">
                    <Button size="sm" style={{ backgroundColor: primaryColor, color: backgroundColor }} className="border-0">
                      Small
                    </Button>
                    <Button style={{ backgroundColor: primaryColor, color: backgroundColor }} className="border-0">
                      Default
                    </Button>
                    <Button size="lg" style={{ backgroundColor: primaryColor, color: backgroundColor }} className="border-0">
                      Large
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="forms" className="space-y-6">
              <Card style={{ backgroundColor, borderColor: secondaryColor }}>
                <CardHeader>
                  <CardTitle style={{ color: textColor }}>Form Controls</CardTitle>
                  <CardDescription style={{ color: textColor, opacity: 0.8 }}>
                    Input fields, switches, sliders, and date pickers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p style={{ color: textColor, fontWeight: 500 }}>Enable notifications</p>
                      <p style={{ color: textColor, opacity: 0.7, fontSize: 'var(--text-xs)' }}>Receive updates about your account</p>
                    </div>
                    <Switch />
                  </div>
                  <Separator style={{ backgroundColor: secondaryColor }} />
                  <div className="space-y-2">
                    <p style={{ color: textColor, fontWeight: 500 }}>Volume: {sliderValue}%</p>
                    <Slider
                      value={sliderValue}
                      onValueChange={setSliderValue}
                      max={100}
                      step={1}
                    />
                  </div>
                  <Separator style={{ backgroundColor: secondaryColor }} />
                  <div className="space-y-2">
                    <p style={{ color: textColor, fontWeight: 500 }}>Select a date</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="gap-2"
                          style={{ borderColor: secondaryColor, color: textColor }}
                        >
                          <CalendarIcon className="w-4 h-4" />
                          {date ? date.toLocaleDateString() : 'Pick a date'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent style={{ backgroundColor, borderColor: secondaryColor }}>
                        <DialogHeader>
                          <DialogTitle style={{ color: textColor }}>Select Date</DialogTitle>
                          <DialogDescription style={{ color: textColor, opacity: 0.8 }}>
                            Choose a date from the calendar below
                          </DialogDescription>
                        </DialogHeader>
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md"
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="data" className="space-y-6">
              <Card style={{ backgroundColor, borderColor: secondaryColor }}>
                <CardHeader>
                  <CardTitle style={{ color: textColor }}>Progress Indicators</CardTitle>
                  <CardDescription style={{ color: textColor, opacity: 0.8 }}>
                    Visual feedback for ongoing processes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span style={{ color: textColor }}>Project Progress</span>
                      <span style={{ color: textColor, opacity: 0.7 }}>75%</span>
                    </div>
                    <Progress value={75} style={{ backgroundColor: secondaryColor }} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span style={{ color: textColor }}>Storage Used</span>
                      <span style={{ color: textColor, opacity: 0.7 }}>45%</span>
                    </div>
                    <Progress value={45} style={{ backgroundColor: secondaryColor }} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span style={{ color: textColor }}>Tasks Completed</span>
                      <span style={{ color: textColor, opacity: 0.7 }}>90%</span>
                    </div>
                    <Progress value={90} style={{ backgroundColor: secondaryColor }} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="feedback" className="space-y-6">
              <Card style={{ backgroundColor, borderColor: secondaryColor }}>
                <CardHeader>
                  <CardTitle style={{ color: textColor }}>Badges & Status</CardTitle>
                  <CardDescription style={{ color: textColor, opacity: 0.8 }}>
                    Visual indicators for status and categories
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge style={{ backgroundColor: primaryColor, color: backgroundColor }}>Primary</Badge>
                    <Badge style={{ backgroundColor: accentColor, color: backgroundColor }}>Accent</Badge>
                    <Badge style={{ backgroundColor: secondaryColor, color: primaryColor }}>Secondary</Badge>
                    <Badge variant="outline" style={{ borderColor: primaryColor, color: primaryColor }}>Outline</Badge>
                  </div>
                  <Separator style={{ backgroundColor: secondaryColor }} />
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#10b981', borderRadius: '50%' }} />
                      <span style={{ color: textColor }}>Online</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#f59e0b', borderRadius: '50%' }} />
                      <span style={{ color: textColor }}>Away</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ef4444', borderRadius: '50%' }} />
                      <span style={{ color: textColor }}>Offline</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Analytics Dashboard with Charts */}
      <section className="px-6 py-16" style={{ backgroundColor: secondaryColor }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ color: textColor }}>Data Visualization</h2>
            <p style={{ color: textColor, opacity: 0.8 }}>Beautiful charts powered by Recharts</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Area Chart */}
            <Card style={{ backgroundColor, borderColor: secondaryColor }}>
              <CardHeader>
                <CardTitle style={{ color: textColor }}>Growth Trends</CardTitle>
                <CardDescription style={{ color: textColor, opacity: 0.8 }}>
                  Monthly performance overview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={secondaryColor} />
                    <XAxis dataKey="name" stroke={textColor} style={{ fontSize: 'var(--text-xs)' }} />
                    <YAxis stroke={textColor} style={{ fontSize: 'var(--text-xs)' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor, borderColor: secondaryColor, color: textColor }}
                    />
                    <Area type="monotone" dataKey="value" stroke={primaryColor} fill={accentColor} fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card style={{ backgroundColor, borderColor: secondaryColor }}>
              <CardHeader>
                <CardTitle style={{ color: textColor }}>Monthly Revenue</CardTitle>
                <CardDescription style={{ color: textColor, opacity: 0.8 }}>
                  Revenue comparison by month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={secondaryColor} />
                    <XAxis dataKey="name" stroke={textColor} style={{ fontSize: 'var(--text-xs)' }} />
                    <YAxis stroke={textColor} style={{ fontSize: 'var(--text-xs)' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor, borderColor: secondaryColor, color: textColor }}
                    />
                    <Bar dataKey="growth" fill={primaryColor} radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Line Chart */}
            <Card style={{ backgroundColor, borderColor: secondaryColor }}>
              <CardHeader>
                <CardTitle style={{ color: textColor }}>User Activity</CardTitle>
                <CardDescription style={{ color: textColor, opacity: 0.8 }}>
                  Daily active users trend
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsLineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={secondaryColor} />
                    <XAxis dataKey="name" stroke={textColor} style={{ fontSize: 'var(--text-xs)' }} />
                    <YAxis stroke={textColor} style={{ fontSize: 'var(--text-xs)' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor, borderColor: secondaryColor, color: textColor }}
                    />
                    <Line type="monotone" dataKey="value" stroke={accentColor} strokeWidth={3} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card style={{ backgroundColor, borderColor: secondaryColor }}>
              <CardHeader>
                <CardTitle style={{ color: textColor }}>Team Distribution</CardTitle>
                <CardDescription style={{ color: textColor, opacity: 0.8 }}>
                  Resources allocated by department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsPieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => entry.name}
                      outerRadius={80}
                      fill={primaryColor}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={[primaryColor, accentColor, secondaryColor, textColor][index % 4]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor, borderColor: secondaryColor, color: textColor }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, value: '10K+', label: 'Active Users', change: '+12%' },
              { icon: TrendingUp, value: '50K+', label: 'Palettes Created', change: '+23%' },
              { icon: Zap, value: '99%', label: 'Uptime', change: '100%' },
              { icon: Shield, value: 'AAA', label: 'WCAG Rating', change: 'Accessible' },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} style={{ backgroundColor, borderColor: secondaryColor }}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="w-8 h-8" style={{ color: primaryColor }} />
                      <Badge style={{ backgroundColor: secondaryColor, color: accentColor }}>
                        {stat.change}
                      </Badge>
                    </div>
                    <h2 style={{ color: textColor }}>{stat.value}</h2>
                    <p style={{ color: textColor, opacity: 0.7 }}>{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid with Icons */}
      <section className="px-6 py-16" style={{ backgroundColor: secondaryColor }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ color: textColor }}>Why Alpha UI Design System?</h2>
            <p style={{ color: textColor, opacity: 0.8 }}>The foundation of modern, accessible design</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Layers, title: 'Modular Architecture', desc: 'Build complex interfaces from simple, reusable components' },
              { icon: Palette, title: 'Design Tokens', desc: 'Consistent spacing, colors, and typography across all components' },
              { icon: Shield, title: 'Accessibility First', desc: 'WCAG AAA compliant with built-in contrast checking' },
              { icon: Code2, title: 'Developer Friendly', desc: 'Clean code, comprehensive docs, and TypeScript support' },
              { icon: Zap, title: 'Performance Optimized', desc: 'Lightweight components with minimal bundle size' },
              { icon: Box, title: 'Figma Integration', desc: 'Seamless design-to-code workflow with our UI kit' },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="transition-all hover:shadow-lg" style={{ backgroundColor, borderColor: secondaryColor }}>
                  <CardHeader className="p-[24px]">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: accentColor, borderRadius: '50%' }}
                    >
                      <Icon className="w-6 h-6" style={{ color: backgroundColor }} />
                    </div>
                    <CardTitle style={{ color: textColor }}>{feature.title}</CardTitle>
                    <CardDescription style={{ color: textColor, opacity: 0.8 }}>
                      {feature.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div
          className="p-12 text-center"
          style={{
            backgroundColor: primaryColor,
            borderRadius: 'var(--radius-card)'
          }}
        >
          <h2 className="mb-4" style={{ color: backgroundColor }}>Ready to Build with Alpha UI?</h2>
          <p className="mb-8 max-w-2xl mx-auto" style={{ color: backgroundColor, opacity: 0.9 }}>
            Start creating beautiful, accessible interfaces with our design system. 
            Test your color palettes in real-time and see how they work across all components.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              className="gap-2 border-0"
              style={{ backgroundColor: accentColor, color: backgroundColor }}
            >
              <Download className="w-4 h-4" />
              Get Alpha UI Kit
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              style={{ borderColor: backgroundColor, color: backgroundColor, backgroundColor: 'transparent' }}
            >
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ color: textColor }}>Loved by Designers & Developers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah Johnson', role: 'Lead Designer at TechCo', text: 'Alpha UI has completely transformed our design workflow. The consistency is unmatched.' },
              { name: 'Mike Chen', role: 'Frontend Developer', text: 'The design tokens make it so easy to maintain consistency across our entire product.' },
              { name: 'Emma Davis', role: 'Product Manager', text: 'Being able to test colors in real-time has saved us countless hours in design reviews.' },
            ].map((testimonial, index) => (
              <Card key={index} style={{ backgroundColor, borderColor: secondaryColor }}>
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4" style={{ color: accentColor, fill: accentColor }} />
                    ))}
                  </div>
                  <p className="mb-6" style={{ color: textColor, opacity: 0.9 }}>
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full"
                      style={{ backgroundColor: secondaryColor, borderRadius: '50%' }}
                    />
                    <div>
                      <p style={{ color: textColor, fontWeight: 500 }}>{testimonial.name}</p>
                      <p style={{ color: textColor, opacity: 0.7, fontSize: 'var(--text-xs)' }}>{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="px-6 py-12" style={{ backgroundColor: secondaryColor }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5" style={{ color: accentColor }} />
            <p style={{ color: textColor, fontWeight: 500 }}>
              Built with Alpha UI Design System
            </p>
          </div>
          <p style={{ color: textColor, opacity: 0.8 }}>
            This website is a live demonstration of the Alpha UI Design System & UI Kit, 
            a pre-internal test of the Seen Design System. Every component, color, spacing, 
            and interaction follows our design tokens and guidelines.
          </p>
        </div>
      </section>
    </>
  );
}
# Design Guidelines: Real-Time Stranger Chat Platform

## Design Approach
**Reference-Based**: Drawing inspiration from Discord (clean chat interface), Zoom (video controls), and Tinder (skip/next mechanics). Combining communication clarity with fast, intuitive interactions for anonymous stranger matching.

## Core Design Principles
1. **Frictionless Entry**: Users start chatting in seconds - no lengthy onboarding
2. **Communication Clarity**: Video feeds and text are the heroes; everything else supports them
3. **Mobile-First**: Optimized for portrait and landscape orientations
4. **Trust & Safety**: Clean, professional aesthetic to establish credibility

## Typography
- **Primary Font**: Inter or Manrope (Google Fonts)
- **Accent Font**: None needed
- **Hierarchy**:
  - Headers: font-bold text-2xl to text-4xl
  - Body text: text-base (16px)
  - UI labels: text-sm font-medium
  - Timestamps/meta: text-xs
  - Chat messages: text-base with slight letter spacing for readability

## Layout System
**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16, 24 (e.g., p-4, gap-8, mt-12)
- Tight spacing for controls: p-2, gap-2
- Medium spacing for sections: p-6, gap-6
- Generous spacing for major sections: py-12, px-8

**Grid System**:
- Full viewport layouts for chat interface (100vh)
- Two-column split on desktop: video feed (70%) + chat sidebar (30%)
- Single column stack on mobile/tablet
- Control bars: fixed positioning at bottom (mobile) or integrated (desktop)

## Component Library

### Navigation
- **Minimal Header**: Logo + user count indicator + settings icon
- Fixed top, h-16, backdrop-blur effect
- No traditional navigation menu

### Hero/Landing (Pre-Chat)
- **Full-screen welcome**: Centered call-to-action
- Large heading explaining concept ("Chat with strangers anonymously")
- Single prominent "Start Chatting" button (large, rounded-lg, px-12 py-4)
- Background: Subtle gradient or abstract pattern
- Trust indicators: "10,000+ users online now"

### Chat Interface Layout
**Desktop**:
- Split screen: Video feed (large, aspect-ratio-video) + Text chat sidebar
- Control bar below video with icon buttons for mute/camera/skip/end
- Message input at bottom of chat sidebar

**Mobile**: 
- Stacked vertically: Video feed top (50-60vh), messages below
- Floating control buttons over video (bottom-right cluster)
- Message input sticky at viewport bottom

### Video/Audio Components
- **Video Container**: Rounded-xl borders, aspect-ratio-video, object-cover
- **Local Preview**: Small circle/square in corner (w-24 to w-32), rounded-full or rounded-lg
- **Placeholder States**: Centered avatar/icon when camera off or waiting
- **Audio Indicator**: Pulsing ring around avatar when speaking

### Control Buttons
- **Icon-Only Buttons**: Circular (rounded-full), w-12 h-12 or w-14 h-14
- Icons: Microphone, camera, skip (next arrow), end call (X or phone)
- Hover states: Scale slightly (scale-105)
- Active states: Toggle appearance for mute/camera off
- Background: Semi-transparent with backdrop-blur when over video

### Chat Messages
- **Bubble Design**: Rounded-2xl, px-4 py-3, max-w-xs to max-w-md
- Sender messages: Align right, distinct treatment
- Receiver messages: Align left, distinct treatment  
- Timestamps: Below bubble, text-xs, opacity-70
- **Typing Indicator**: Three animated dots in bubble shape

### Text Input
- **Message Box**: Rounded-full input field with send button integrated
- Height: h-12, px-6
- Send button: Circular icon button (arrow or paper plane)
- Sticky positioning at bottom

### Matching/Loading States
- **Waiting Screen**: Centered spinner with text "Finding someone for you..."
- Animated loading indicator (spinner or pulsing dots)
- "Cancel" button below

### Skip/Next Functionality
- **Prominent Skip Button**: Easily accessible, large target area
- Clear labeling: "Next" or skip icon
- Confirmation not needed (instant action)

### Session Controls
- **End Chat Button**: Clear, destructive styling cues
- Positioned prominently but not accidentally clickable

## Animations
**Minimal and Purposeful**:
- Message send: Slide-in from right/left (duration-200)
- Typing indicator: Gentle pulse/bounce
- Button interactions: scale-105 on hover (duration-150)
- Video connection: Fade-in (duration-300)
- Skip transition: Quick fade (duration-200)
- **No**: Elaborate page transitions, scroll-triggered effects, or decorative animations

## Responsive Breakpoints
- **Mobile** (< 768px): Vertical stack, floating controls
- **Tablet** (768px - 1024px): Optimized vertical layout or side-by-side with adjusted ratios
- **Desktop** (> 1024px): Full side-by-side layout with generous spacing

## Images
**No hero images needed** - this is a functional web app focused on user-generated video content. The video feeds ARE the visual content. 

**Icon Requirements**: Use Heroicons for all UI controls (solid for active states, outline for default states)

## Ad Placement Strategy
- **Banner Ads**: Above or below chat interface (never overlapping communication)
- **Sidebar Ads**: In text chat sidebar between messages (desktop only)
- **Interstitial Ads**: After X conversations or on "Next" action
- Ensure ads don't interfere with core functionality or video visibility

## Accessibility
- High contrast text throughout
- Clear focus indicators on all interactive elements
- ARIA labels for icon-only buttons
- Keyboard navigation for skip/end actions (Tab + Enter)
- Screen reader announcements for new messages and state changes
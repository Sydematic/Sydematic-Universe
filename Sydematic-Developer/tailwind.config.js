export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,jsx}",
		"./components/**/*.{js,jsx}",
		"./app/**/*.{js,jsx}",
		"./src/**/*.{js,jsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					glow: 'hsl(var(--accent-glow))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Aurora Colors
				'aurora-pink': {
					DEFAULT: 'hsl(var(--aurora-pink))',
					foreground: 'hsl(var(--aurora-pink-foreground))'
				},
				'aurora-cyan': {
					DEFAULT: 'hsl(var(--aurora-cyan))',
					foreground: 'hsl(var(--aurora-cyan-foreground))'
				},
				// Quantum/Math Colors
				quantum: {
					DEFAULT: 'hsl(var(--quantum))',
					foreground: 'hsl(var(--quantum-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backgroundImage: {
				'gradient-aurora': 'var(--gradient-aurora)',
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-accent': 'var(--gradient-accent)',
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-quantum': 'var(--gradient-quantum)',
				'star-field': 'var(--star-field)'
			},
			boxShadow: {
				'aurora': 'var(--aurora-shadow)',
				'glow': 'var(--aurora-glow)',
				'glow-primary': '0 0 60px hsl(var(--primary) / 0.4)',
				'glow-accent': '0 0 50px hsl(var(--accent) / 0.4)',
				'glow-quantum': '0 0 40px hsl(var(--quantum) / 0.3)'
			},
			transitionTimingFunction: {
				'ethereal': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				// Aurora Animations
				'float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'50%': { transform: 'translateY(-20px) rotate(2deg)' }
				},
				'aurora-dance': {
					'0%, 100%': { 
						transform: 'translateX(-100px) translateY(-50px) rotate(0deg)',
						opacity: '0.2'
					},
					'25%': { 
						transform: 'translateX(100px) translateY(-100px) rotate(90deg)',
						opacity: '0.4'
					},
					'50%': { 
						transform: 'translateX(-50px) translateY(50px) rotate(180deg)',
						opacity: '0.3'
					},
					'75%': { 
						transform: 'translateX(50px) translateY(-25px) rotate(270deg)',
						opacity: '0.35'
					}
				},
				'glow-pulse': {
					'0%, 100%': { 
						boxShadow: '0 0 30px hsl(var(--primary) / 0.4)',
						filter: 'brightness(1)'
					},
					'50%': { 
						boxShadow: '0 0 60px hsl(var(--primary) / 0.7)',
						filter: 'brightness(1.3)'
					}
				},
				'twinkle': {
					'0%, 100%': { opacity: '0.3' },
					'50%': { opacity: '1' }
				},
				'slide-up': {
					'0%': { 
						transform: 'translateY(100px)',
						opacity: '0'
					},
					'100%': { 
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'slide-left': {
					'0%': { 
						transform: 'translateX(100px)',
						opacity: '0'
					},
					'100%': { 
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'scale-in': {
					'0%': { 
						transform: 'scale(0.8)',
						opacity: '0'
					},
					'100%': { 
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				// Aurora Animations
				'float': 'float 8s ease-in-out infinite',
				'aurora-dance': 'aurora-dance 15s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
				'twinkle': 'twinkle 2s ease-in-out infinite',
				'slide-up': 'slide-up 0.8s ease-out',
				'slide-left': 'slide-left 0.8s ease-out',
				'fade-in': 'fade-in 1s ease-out',
				'scale-in': 'scale-in 0.6s ease-out',
				'rotate-slow': 'rotate-slow 30s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
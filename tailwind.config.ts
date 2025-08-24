import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
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
					foreground: 'hsl(var(--primary-foreground))'
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
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				quantum: {
					alice: 'hsl(var(--quantum-alice))',
					bob: 'hsl(var(--quantum-bob))',
					eve: 'hsl(var(--quantum-eve))',
					entangled: 'hsl(var(--quantum-entangled))',
					noise: 'hsl(var(--quantum-noise))'
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
				'quantum-pulse': {
					'0%, 100%': {
						boxShadow: '0 0 0 0 hsl(var(--quantum-entangled) / 0.7)'
					},
					'50%': {
						boxShadow: '0 0 0 10px hsl(var(--quantum-entangled) / 0)'
					}
				},
				'photon-travel': {
					'0%': {
						transform: 'translateX(0) rotate(0deg)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateX(300px) rotate(360deg)',
						opacity: '0.8'
					}
				},
				'polarization-rotate': {
					'0%': { transform: 'rotate(0deg)' },
					'25%': { transform: 'rotate(45deg)' },
					'50%': { transform: 'rotate(90deg)' },
					'75%': { transform: 'rotate(135deg)' },
					'100%': { transform: 'rotate(180deg)' }
				},
				'quantum-entangle': {
					'0%, 100%': {
						transform: 'scale(1)',
						filter: 'hue-rotate(0deg)'
					},
					'50%': {
						transform: 'scale(1.05)',
						filter: 'hue-rotate(180deg)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'quantum-pulse': 'quantum-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'photon-travel': 'photon-travel 3s linear infinite',
				'polarization-rotate': 'polarization-rotate 4s linear infinite',
				'quantum-entangle': 'quantum-entangle 3s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

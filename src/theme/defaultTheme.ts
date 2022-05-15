import { extendTheme } from '@chakra-ui/react';

const colors = {
	white: {
		700 : '#ffffff'
	},
	blue: {
		100: '#6AC0DD',
		200: '#F0F9FC',
		700: '#011135',
	},
	orange: '#E76000',
	red: {
		100: '#DD3E26',
	},
	black: {
		100: '#272727',
		200: '#3D3D3D',
		700: '#000'
	},
	grey: {
		100: '#E5E5E5',
		200: '#6E675E',
		300: '#F5F4F4',
		400: '#EBEBEB',
		500: '#3D3D3D',
		600: '#6D6862',
		700: '#EBEAE8',
		800: '#C4C4C4',
		900: '#9B958C',
	},
	fuchsia: {
		100: '#CF2FBD',
		200: '#FAEAF8',
		700: '#fe00e2',
	},
	green: {
		100: '#00a788',
		700 : '#00ff00'
	},
	card: {
		background: '#FFFFFF',
	},
};

const components = {
	Button: {
		baseStyle: {
			fontFamily: 'Helvetica Neue',
			borderRadius: '1vmin',
			padding: '0.5vh 7.6vw',
			fontWeight: '600',
			color: 'white.700',
			fontSize: '2.5vh',
		},
		variants: {
			solid : {
				backgroundColor : 'blue.100',
				color : 'white.700',
				_hover: {
					background: 'fuchsia.100',
				},
			},
			outline : {
				backgroundColor : 'black.700',
				color : 'green.700',
				borderColor: 'green.700',
				borderWidth : '1px',
				padding: '1px 30px',
			},
			ghost : {
				backgroundColor : 'blue.700',
				color : 'white.700',
				padding: '0.01vh 1vw',
				_hover: {
					background: 'fuchsia.100',
				},
			},
			ghost_selected :{
				backgroundColor : 'fuchsia.100',
				color : 'white.700',
				padding: '0.01vh 1vw',
				_hover: {
					background: 'fuchsia.100',
				},
			},
			fuchsia: {
				backgroundColor: 'fuchsia.100',
				color: 'white',
			},
			darkGrey: {
				backgroundColor: '#3D3D3D',
				color: 'white',
				_hover: {
					background: 'grey.200',
				},
			},
			white: {
				backgroundColor: 'white',
				color: 'black',
			},
			black: {
				backgroundColor: 'black.100',
				color: 'white',
				_hover: {
					background: 'black.200',
				},
			},
		},
		sizes: {
			normal: {
				height: '56px',
			},
			small: {
				height: '40px',
				fontSize: '14px',
			},
		},
		defaultProps: {
			size: 'normal',
			variant: 'fuchsia',
		},
	},
	Input: {
		baseStyle: {
			field: {
				borderColor: 'blue.100',
				backgroundColor : 'blue.700',
				color : 'white.700',
				borderRadius: '2px',
				borderWidth: '2px',
			},
		},
		variants: {
			normal: {
				field: {
					borderWidth: '2px',
				},
			},
			searchbar: {
				field: {
					borderWidth: '0px',
					fontSize: '14px',
				},
			},
		},
		sizes: {
			normal: {
				field: {
					borderWidth: '2px',
					height: '56px',
					paddingLeft: '17px',
				},
			},
			small: {
				field: {
					height: '40px',
				},
			},
		},
		defaultProps: {
			size: 'normal',
			variant: 'normal',
		},
	},
	FormLabel :{
		baseStyle: {
			fontWeight: '600',
			color: 'white.700',
			fontSize: '2vh',
		}
	},
	TextArea :{
		baseStyle: {
			fontWeight: '400',
			color: 'white.700',
			backgroundColor : 'blue.700',
			borderColor : 'blue.100',
			fontSize: '1.2vh',
		}
	},
	Text: {
		baseStyle: {
			fontWeight: '400',
			color: 'white.700',
			fontSize: '2vh',
		},
		sizes: {},
		defaultProps: {},
		variants: {
			max: {
				fontFamily : 'Helvetica Neue',
				fontSize : '7vmin',
				fontWeight : '500',
				lineHeight : '7.4vmin',
				letterSpacing : '0.02em'
			},
			caption: {
				fontFamily : 'Helvetica Neue',
				fontSize : '4vmin',
				fontWeight : '500',
				lineHeight : '4.2vmin',
				letterSpacing : '0.01em'
			},
			header: {
				fontFamily : 'Helvetica Neue',
				fontSize : '5vh',
				fontWeight : '600',
				lineHeight : '5.2vh',
				letterSpacing : '0.01em'
			},
			solid: {
				margin : '5px',
			},
			outline: {
				borderColor: 'blue.100',
				borderWidth: '1px'
			},
			ghost: {
				backgroundColor: 'blue.700',
				color: 'white.700'
			},
			ghost_selected :{
				backgroundColor : 'fuchsia.100',
				color : 'white.700',
				padding: '0.01vh 0.5vw',
				_hover: {
					background: 'fuchsia.100',
				},
			},
			error: {
				backgroundColor: 'blue.700',
				color: 'fuchsia.700',
				fontSize: '1.5vh',
			},
			tiny: {
				fontWeight : '200',
				fontSize : '1vh',
			},
		}
	},
	Link: {
		baseStyle: {
			color: 'black',
			textDecoration: 'underline',
		},
	},
	IconButton: {
		baseStyle: {
			borderRadius: '10px',
		},
		variants: {
			transparent: {
				backgroundColor: 'rgba(0, 0, 0, 0)',
			},
		},
	},
	Spinner: {
		baseStyle: {
			color: 'fuchsia.100',
			margin: '5vmin',
			width : '10vmin',
			height : '10vmin',
			borderWidth : '1vmin'
		}
	},
};

const fonts = {
	heading: 'Monaco',
	body: 'Courier',
};

export const defaultTheme = extendTheme({ colors, fonts, components });

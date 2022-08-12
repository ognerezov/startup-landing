import { extendTheme } from '@chakra-ui/react';

const colors = {
	white: {
		700 : '#ffffff'
	},
	blue: {
		100: '#E7D4FF',
		200: '#B7D2E2',
		// 300 : '#2F75BB',
		300 : '#5A35A9',
		400 : '#7F5AF0',
		500: '#2A3D5A',
		700: '#011135',
	},
	orange: '#E76000',
	red: {
		100: '#DD3E26',
		200: '#D77B5F',
	},
	black: {
		100: '#272727',
		200: '#3D3D3D',
		700: '#000'
	},
	grey: {
		50 : '#aaaaaa',
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
		// 300 : '#00A389',
		300 : '#FF9C07',
		// 300 : '#BBE37F',
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
			borderRadius: '0.7vmin',
			padding: '0.5vh 7.6vw',
			fontWeight: '600',
			fontSize: '2.2vh',
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
				my : '1vh',
				mx : '0.2vw',
				backgroundColor : 'blue.300',
				color : 'white.700',
				padding: '0.01vh 1vw',
				_hover: {
					background: 'green.300',
				},
			},
			ghost_selected :{
				my : '1vh',
				mx : '0.2vw',
				backgroundColor : 'green.300',
				color : 'white.700',
				padding: '0.01vh 1vw',
				_hover: {
					background: 'blue.300',
				},
			},

			small : {
				backgroundColor: 'green.300',
				color: 'white.700',
				padding: '0.1vmin',
				fontWeight: '300',
				fontSize: '1.5vh',
				_hover: {
					background: 'blue.300',
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
	NumberInput: {
		baseStyle: {
			field: {
				borderColor: 'blue.300',
				backgroundColor: 'white',
				color: 'black',
				fontWeight: '400',
				fontSize: '1.5vh',
			},
		},
	},
	Input: {
		baseStyle: {
			field: {
				borderColor: 'blue.300',
				backgroundColor: 'white',
				color: 'black',
				py: '0.5vmin',
				borderRadius: '0.5vmin',
				fontWeight: '700',
				fontSize: '2.0vh',
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
			medium : {
				field : {
					borderColor: 'blue.300',
					backgroundColor: 'white',
					color: 'black',
					py: '0.5vmin',
					borderRadius: '0.5vmin',
					fontWeight: '400',
					fontSize: '1vh',
				}
			}
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
		}, variants : {
			medium : {
				backgroundColor: 'white',
				color: 'blue.300',
				py : '0.5vmin',
				borderRadius : '0.5vmin',
				fontWeight: '700',
				fontSize: '2.0vh',
			}
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
			success: {
				fontSize : '3vmin',
				fontWeight : 'bold',
				lineHeight : '3.5vmin',
				letterSpacing : '0.02em',
				color : 'green.300'
			},
			caption: {
				fontFamily : 'Helvetica Neue',
				fontSize : '4vmin',
				fontWeight : '500',
				lineHeight : '4.2vmin',
				letterSpacing : '0.01em'
			},
			caption_s: {
				fontFamily : 'Helvetica Neue',
				fontSize : '2.7vmin',
				fontWeight : '400',
				lineHeight : '3vmin',
				letterSpacing : '0.01em'
			},
			regular: {
				color : 'blue.300',
				fontFamily : 'Helvetica Neue',
				fontSize : '1.6vh',
				fontWeight : '400',
				lineHeight : '1.7vh',
			},
			regular_highlighted: {
				color : 'green.300',
				fontFamily : 'Helvetica Neue',
				fontSize : '1.6vh',
				fontWeight : '400',
				lineHeight : '1.7vh',
			},
			emphasis: {
				color : 'white',
				fontFamily : 'Helvetica Neue',
				fontSize : '1.9vh',
				fontWeight : '600',
				lineHeight : '2.0vh',
			},
			bold: {
				color : 'blue.300',
				fontFamily : 'Helvetica Neue',
				fontSize : '1.7vh',
				fontWeight : '700',
				lineHeight : '1.7vh',
			},
			price: {
				color : 'green.300',
				fontFamily : 'Helvetica Neue',
				fontSize : '1.6vh',
				fontWeight : '700',
				lineHeight : '1.7vh',
				textAlign : 'start'
			},
			price_xl: {
				color : 'green.300',
				fontFamily : 'Helvetica Neue',
				fontSize : '2.6vh',
				fontWeight : '700',
				lineHeight : '2.7vh',
				textAlign : 'center',
				py : '1vh'
			},
			title_b: {
				color : 'blue.300',
				fontFamily : 'Helvetica Neue',
				fontSize : '2.6vmin',
				fontWeight : '500',
				lineHeight : '2.7vmin',
				marginY : '1vh'
			},
			title_g: {
				color : 'green.300',
				fontFamily : 'Helvetica Neue',
				fontSize : '2.6vh',
				fontWeight : '700',
				lineHeight : '2.7vh',
				marginY : '1vh'
			},
			small : {
				backgroundColor: 'green.300',
				color: 'white.700',
				padding: '1vmin',
				fontWeight: '300',
				fontSize: '1.5vh',
				borderRadius : '0.5vmin',
				_hover: {
					background: 'blue.300',
				},
			},
			medium_phone_solid : {
				backgroundColor: 'blue.300',
				color: 'white',
				py : '0.5vmin',
				borderRadius : '0.5vmin',
				fontWeight: '700',
				fontSize: '1.5vh',
				_hover: {
					background: 'green.300',
					color : 'white'
				},
			},
			medium_phone : {
				backgroundColor: 'white',
				color: 'blue.300',
				py : '0.5vmin',
				borderRadius : '0.5vmin',
				fontWeight: '700',
				fontSize: '1.5vh',
				_hover: {
					background: 'blue.300',
					color : 'white'
				},
			},
			medium : {
				backgroundColor: 'white',
				color: 'blue.300',
				py : '0.5vmin',
				borderRadius : '0.5vmin',
				fontWeight: '700',
				fontSize: '2.0vh',
				_hover: {
					background: 'blue.300',
					color : 'white'
				},
			},
			medium_disabled : {
				backgroundColor: 'white',
				color: 'grey.200',
				py : '0.5vmin',
				borderRadius : '0.5vmin',
				fontWeight: '400',
				fontSize: '2.0vh',
				textDecoration: 'line-through',
			},
			medium_phone_disabled : {
				backgroundColor: 'white',
				color: 'grey.200',
				py : '0.5vmin',
				borderRadius : '0.5vmin',
				fontWeight: '400',
				fontSize: '1.5vh',
				textDecoration: 'line-through',
			},
			medium_solid : {
				backgroundColor: 'blue.300',
				color: 'white',
				py : '0.5vmin',
				borderRadius : '0.5vmin',
				fontWeight: '700',
				fontSize: '2.0vh',
				_hover: {
					background: 'green.300',
					color : 'white'
				},
			},
			medium_selected : {
				backgroundColor: 'green.300',
				color: 'white',
				py : '0.5vmin',
				borderRadius : '0.5vmin',
				fontWeight: '700',
				fontSize: '2.0vh',
				_hover: {
					background: 'blue.400',
					color : 'white'
				},
			},
			medium_phone_selected : {
				backgroundColor: 'gree.300',
				color: 'white',
				py : '0.5vmin',
				borderRadius : '0.5vmin',
				fontWeight: '700',
				fontSize: '1.5vh',
				_hover: {
					background: 'blue.300',
					color : 'white'
				},
			},
			medium_phone_semisolid : {
				backgroundColor: 'blue.400',
				color: 'white',
				py : '0.5vmin',
				borderRadius : '0.5vmin',
				fontWeight: '500',
				fontSize: '1.5vh',
				_hover: {
					background: 'green.300',
					color : 'white'
				},
			},
			medium_semisolid : {
				backgroundColor: 'blue.400',
				color: 'white',
				py : '0.5vmin',
				borderRadius : '0.5vmin',
				fontWeight: '500',
				fontSize: '2.0vh',
				_hover: {
					background: 'green.300',
					color : 'white'
				},
			},
			medium_ghost : {
				backgroundColor: 'white',
				color: 'green.300',
				py : '0.5vmin',
				fontWeight: 'bold',
				fontSize: '2.0vh'
			},
			medium_phone_ghost : {
				backgroundColor: 'white',
				color: 'green.300',
				py : '0.5vmin',
				fontWeight: 'bold',
				fontSize: '1.5vh'
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
				backgroundColor: 'fuchsia.100',
				color: 'white',
				fontSize: '2.1vh',
				fontWeight : '700',
				width: '100%',
				padding : '1vmax'
			},
			tiny: {
				color : 'black',
				fontWeight : '200',
				fontSize : '1.1vh',
			},
			tiny_caption: {
				color : 'blue.300',
				fontWeight : '600',
				fontSize : '1.1vh',
			}
			,
			annotation: {
				color : 'black',
				fontWeight : '200',
				fontSize : '1.35vh',
			},
			annotation_caption: {
				color : 'blue.300',
				fontWeight : '600',
				fontSize : '1.35vh',
			}
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

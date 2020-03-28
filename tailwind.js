/*

Tailwind - The Utility-First CSS Framework

A project by Adam Wathan (@adamwathan), Jonathan Reinink (@reinink),
David Hemphill (@davidhemphill) and Steve Schoger (@steveschoger).

Welcome to the Tailwind config file. This is where you can customize
Tailwind specifically for your project. Don't be intimidated by the
length of this file. It's really just a big JavaScript object and
we've done our very best to explain each section.

View the full documentation at https://tailwindcss.com.


|-------------------------------------------------------------------------------
| The default config
|-------------------------------------------------------------------------------
|
| This variable contains the default Tailwind config. You don't have
| to use it, but it can sometimes be helpful to have available. For
| example, you may choose to merge your custom configuration
| values with some of the Tailwind defaults.
|
*/

// let defaultConfig = require('tailwindcss/defaultConfig')()

/*
|-------------------------------------------------------------------------------
| Colors                                    https://tailwindcss.com/docs/colors
|-------------------------------------------------------------------------------
|
| Here you can specify the colors used in your project. To get you started,
| we've provided a generous palette of great looking colors that are perfect
| for prototyping, but don't hesitate to change them for your project. You
| own these colors, nothing will break if you change everything about them.
|
| We've used literal color names ("red", "blue", etc.) for the default
| palette, but if you'd rather use functional names like "primary" and
| "secondary", or even a numeric scale like "100" and "200", go for it.
|
*/

let colors = {
    'transparent': 'transparent',
    'background':  '#EBF0F3',

    'black':        '#000000',
    'almost-black': '#1F1F1F',
    'black-text':   '#1F1E1D',
    'white':        '#FFFFFF',

    'grey-light':        '#EEF2F5',
    'grey-medium':       '#C4D8E2',
    'grey-medium-dark':  '#A7B9C1',
    'grey-dark':         '#393837',
    'grey-darker':       '#1F1E1D',
    'grey-darker-hover': '#4B4B4B',

    'blue':            '#00B1FF',
    'blue-hover':      '#0097E5',
    'blue-light':      '#C3D7E1',
    'blue-lighter':    '#EEF2F4',
    'blue-dull':       '#83B1C9',
    'blue-dull-hover': '#C4D7E2',
    'blue-duller':     '#859BB8',
    'blue-border':     '#D2E2EB',
    'blue-dark':       '#7391A6',
    'blue-darker':     '#395785',
    'blue-rijks':      '#84BAD1',
    'blue-dark-slate': '#463F82',

    'green':         '#00C63C',
    'green-hover':   '#17A041',
    'green-light':   '#00C63C',
    'green-lighter': '#CDE0DA',
    'green-dull':    '#7CBF88',
    'green-medium':  '#6BAD96',

    'yellow':       '#FDC526',
    'yellow-hover': '#E8B010',
    'yellow-dull':  '#DAC076',

    'orange':        '#FF6200',
    'orange-hover':  '#E0671B',
    'orange-light':  '#FDC526',
    'orange-bright': '#F7AA18',
    'orange-dull':   '#AF9E83',

    'red':       '#FE3525',
    'red-hover': '#D24141',
    'red-dull':  '#D24141',

    'violet':       '#8F02FF',
    'violet-hover': '#71538A',
    'violet-dull':  '#71538A',

    'pink':       '#FF05DE',
    'pink-hover': '#E212C7',
    'pink-dull':  '#CC75C1',
};

module.exports = {

    /*
    |-----------------------------------------------------------------------------
    | Colors                                  https://tailwindcss.com/docs/colors
    |-----------------------------------------------------------------------------
    |
    | The color palette defined above is also assigned to the "colors" key of
    | your Tailwind config. This makes it easy to access them in your CSS
    | using Tailwind's config helper. For example:
    |
    | .error { color: config('colors.red') }
    |
    */
    theme:{
        colors: colors,

        /*
        |-----------------------------------------------------------------------------
        | Screens                      https://tailwindcss.com/docs/responsive-design
        |-----------------------------------------------------------------------------
        |
        | Screens in Tailwind are translated to CSS media queries. They define the
        | responsive breakpoints for your project. By default Tailwind takes a
        | "mobile first" approach, where each screen size represents a minimum
        | viewport width. Feel free to have as few or as many screens as you
        | want, naming them in whatever way you'd prefer for your project.
        |
        | Tailwind also allows for more complex screen definitions, which can be
        | useful in certain situations. Be sure to see the full responsive
        | documentation for a complete list of options.
        |
        | Class name: .{screen}:{utility}
        |
        */

        screens: {
            'xxs':    {'max': '340px'},
            'xs':     {'max': '374px'},
            '<sm':    {'max': '767px'},
            'max-sm': {'max': '767px'},
            'sm':     {'min': '375px', 'max': '767px'},
            'sm>':    {'min': '375px'},
            'min-sm': {'min': '375px'},
            '<md':    {'max': '1023px'},
            'max-md': {'max': '1023px'},
            'md':     {'min': '768px', 'max': '1023px'},
            'md>':    {'min': '768px'},
            'min-md': {'min': '768px'},
            'lg':     {'min': '1024px', 'max': '1399px'},
            'lg>':    {'min': '1024px'},
            'min-lg': {'min': '1024px'},
            '<lg':    {'max': '1399px'},
            'xl':     {'min': '1400px'},
        },


        /*
        |-----------------------------------------------------------------------------
        | Fonts                                    https://tailwindcss.com/docs/fonts
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your project's font stack, or font families.
        | Keep in mind that Tailwind doesn't actually load any fonts for you.
        | If you're using custom fonts you'll need to import them prior to
        | defining them here.
        |
        | By default we provide a native font stack that works remarkably well on
        | any device or OS you're using, since it just uses the default fonts
        | provided by the platform.
        |
        | Class name: .font-{name}
        |
        */

        fonts: {
            'sans':  [
                'GTWalsheim', 'sans-serif',

            ],
            'serif': [
                'serif',
            ]
        },


        /*
        |-----------------------------------------------------------------------------
        | Text sizes                         https://tailwindcss.com/docs/text-sizing
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your text sizes. Name these in whatever way
        | makes the most sense to you. We use size names by default, but
        | you're welcome to use a numeric scale or even something else
        | entirely.
        |
        | By default Tailwind uses the "rem" unit type for most measurements.
        | This allows you to set a root font size which all other sizes are
        | then based on. That said, you are free to use whatever units you
        | prefer, be it rems, ems, pixels or other.
        |
        | Class name: .text-{size}
        |
        */

        textSizes: {
            '11':  '11px',
            '12':  '12px',
            '13':  '13px',
            '14':  '14px',
            '15':  '15px',
            '16':  '16px',
            '17':  '17px',
            '18':  '18px',
            '20':  '20px',
            '21':  '21px',
            '22':  '22px',
            '23':  '23px',
            '24':  '24px',
            '25':  '25px',
            '26':  '26px',
            '27':  '27px',
            '28':  '28px',
            '30':  '30px',
            '32':  '32px',
            '40':  '40px',
            '50':  '50px',
            '100': '100px',
            '2em': '2em',
        },


        /*
        |-----------------------------------------------------------------------------
        | Font weights                       https://tailwindcss.com/docs/font-weight
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your font weights. We've provided a list of
        | common font weight names with their respective numeric scale values
        | to get you started. It's unlikely that your project will require
        | all of these, so we recommend removing those you don't need.
        |
        | Class name: .font-{weight}
        |
        */

        fontWeights: {
            'light':  300,
            'normal': 400,
            'bold':   700,
        },


        /*
        |-----------------------------------------------------------------------------
        | Leading (line height)              https://tailwindcss.com/docs/line-height
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your line height values, or as we call
        | them in Tailwind, leadings.
        |
        | Class name: .leading-{size}
        |
        | **b:body font
        | **h:header font
        */

        leading: {
            'none':   '0',
            'normal': '1.5',
            '0.5':    '0.5',
            '1':      '1',
            '1-2':    '1.2',
            '1-5':    '1.5',
            '1-89':   '1.89',
            '1-67':   '1.67',
            '2':      '2',
            '18b':    '26px',
            '20b':    '30px',
            'h4':     '1.6',
            'header': '1.2',
        },


        /*
        |-----------------------------------------------------------------------------
        | Tracking (letter spacing)       https://tailwindcss.com/docs/letter-spacing
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your letter spacing values, or as we call
        | them in Tailwind, tracking.
        |
        | Class name: .tracking-{size}
        |
        */

        tracking: {
            'normal': '0',
        },


        /*
        |-----------------------------------------------------------------------------
        | Text colors                         https://tailwindcss.com/docs/text-color
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your text colors. By default these use the
        | color palette we defined above, however you're welcome to set these
        | independently if that makes sense for your project.
        |
        | Class name: .text-{color}
        |
        */

        textColors: colors,


        /*
        |-----------------------------------------------------------------------------
        | Background colors             https://tailwindcss.com/docs/background-color
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your background colors. By default these use
        | the color palette we defined above, however you're welcome to set
        | these independently if that makes sense for your project.
        |
        | Class name: .bg-{color}
        |
        */

        backgroundColors: colors,


        /*
        |-----------------------------------------------------------------------------
        | Background sizes               https://tailwindcss.com/docs/background-size
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your background sizes. We provide some common
        | values that are useful in most projects, but feel free to add other sizes
        | that are specific to your project here as well.
        |
        | Class name: .bg-{size}
        |
        */

        backgroundSize: {
            'auto':    'auto',
            'cover':   'cover',
            'contain': 'contain',
        },


        /*
        |-----------------------------------------------------------------------------
        | Border widths                     https://tailwindcss.com/docs/border-width
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your border widths. Take note that border
        | widths require a special "default" value set as well. This is the
        | width that will be used when you do not specify a border width.
        |
        | Class name: .border{-side?}{-width?}
        |
        */

        borderWidths: {
            default: '1px',
            '0':     '0',
            '1':     '1px',
            '2':     '2px',
            '3':     '3px',
            '4':     '4px',
            '5':     '5px',
            '6':     '6px',
            '7':     '7px',
            '8':     '8px',
            '9':     '9px',
            '10':    '10px',
        },

        scale:{
            '0': '0',
            '25': '.25',
            '50': '.5',
            '75': '.75',
            '90': '.9',
            '95': '.95',
            '100': '1',
            '105': '1.05',
            '110': '1.1',
            '125': '1.25',
            '150': '1.5',
            '200': '2'
        },


        /*
        |-----------------------------------------------------------------------------
        | Border colors                     https://tailwindcss.com/docs/border-color
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your border colors. By default these use the
        | color palette we defined above, however you're welcome to set these
        | independently if that makes sense for your project.
        |

        | Take note that border colors require a special "default" value set
        | as well. This is the color that will be used when you do not
        | specify a border color.
        |
        | Class name: .border-{color}
        |
        */

        borderColors: global.Object.assign({default: colors['blue-dull-hover']}, colors),


        /*
        |-----------------------------------------------------------------------------
        | Border radius                    https://tailwindcss.com/docs/border-radius
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your border radius values. If a `default` radius
        | is provided, it will be made available as the non-suffixed `.rounded`
        | utility.
        |
        | If your scale includes a `0` value to reset already rounded corners, it's
        | a good idea to put it first so other values are able to override it.
        |
        | Class name: .rounded{-side?}{-size?}
        |
        */

        borderRadius: {
            'none':   '0',
            default:  '4px',
            'button': '6px',
            'full':   '9999px',
        },


        /*
        |-----------------------------------------------------------------------------
        | Width                                    https://tailwindcss.com/docs/width
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your width utility sizes. These can be
        | percentage based, pixels, rems, or any other units. By default
        | we provide a sensible rem based numeric scale, a percentage
        | based fraction scale, plus some other common use-cases. You
        | can, of course, modify these values as needed.
        |
        |
        | It's also worth mentioning that Tailwind automatically escapes
        | invalid CSS class name characters, which allows you to have
        | awesome classes like .w-2/3.
        |
        | Class name: .w-{size}
        |
        */

        width: {
            'auto':   'auto',
            'unset':  'unset',
            'px':     '1px',
            '1/2':    '50%',
            '1/3':    '33.33333%',
            '2/3':    '66.66667%',
            '1/4':    '25%',
            '3/4':    '75%',
            '1/5':    '20%',
            '2/5':    '40%',
            '3/5':    '60%',
            '4/5':    '80%',
            '1/6':    '16.66667%',
            '5/6':    '83.33333%',
            '200':    '200px',
            '285':    '285px',
            '110':    '110px',
            '80':     '80px',
            '85':     '85px',
            'full':   '100%',
            'screen': '100vw',

            'xs': '100%',
            'sm': '345px',
            'md': '620px',
            'lg': '950px',
            'xl': '1040px',
        },

        top: {
            '0':   '0px',
            '10':  '10px',
            '20':  '20px',
            '30':  '30px',
            '50':  '50%',
            '1/2': '50%',
        },

        left: {
            '0':   '0px',
            '10':  '10px',
            '20':  '20px',
            '30':  '30px',
            '50':  '50%',
            '1/2': '50%',
        },
        bottom: {
            '0':   '0px',
            '10':  '10px',
            '20':  '20px',
            '30':  '30px',
            '50':  '50%',
            '1/2': '50%',
        },
        right: {
            '0':   '0px',
            '10':  '10px',
            '20':  '20px',
            '30':  '30px',
            '50':  '50%',
            '1/2': '50%',
        },


        /*
        |-----------------------------------------------------------------------------
        | Height                                  https://tailwindcss.com/docs/height
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your height utility sizes. These can be
        | percentage based, pixels, rems, or any other units. By default
        | we provide a sensible rem based numeric scale plus some other
        | common use-cases. You can, of course, modify these values as
        | needed.
        |
        | Class name: .h-{size}
        |
        */

        height: {
            '0':      '0px',
            '5':      '5px',
            '20':     '20px',
            '55':     '55px',
            '65':     '65px',
            '60':     '60px',
            '100':    '100px',
            '200':    '200px',
            '300':    '300px',
            'auto':   'auto',
            'full':   '100%',
            'screen': '100vh'
        },


        /*
        |-----------------------------------------------------------------------------
        | Minimum width                        https://tailwindcss.com/docs/min-width
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your minimum width utility sizes. These can
        | be percentage based, pixels, rems, or any other units. We provide a
        | couple common use-cases by default. You can, of course, modify
        | these values as needed.
        |
        | Class name: .min-w-{size}
        |
        */

        minWidth: {
            '0':    '0',
            '50':   '50px',
            '70':   '70px',
            '85':   '85px',
            '100':  '100px',
            '160':  '160px',
            '190':  '190px',
            '400':  '400px',
            '800':  '800px',
            'full': '100%',
        },


        /*
        |-----------------------------------------------------------------------------
        | Minimum height                      https://tailwindcss.com/docs/min-height
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your minimum height utility sizes. These can
        | be percentage based, pixels, rems, or any other units. We provide a
        | few common use-cases by default. You can, of course, modify these
        | values as needed.
        |
        | Class name: .min-h-{size}
        |
        */

        minHeight: {
            '0':      '0',
            '50':     '50px',
            '70':     '70px',
            '100':    '100px',
            '120':    '120px',
            '200':'200px',
            '300':    '300px',
            '367':    '367px',
            '400':    '400px',
            'full':   '100%',
            'screen': '100vh'
        },


        /*
        |-----------------------------------------------------------------------------
        | Maximum width                        https://tailwindcss.com/docs/max-width
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your maximum width utility sizes. These can
        | be percentage based, pixels, rems, or any other units. By default
        | we provide a sensible rem based scale and a "full width" size,
        | which is basically a reset utility. You can, of course,
        | modify these values as needed.
        |
        | Class name: .max-w-{size}
        |
        */

        maxWidth: {
            // 'sm': '30rem',
            '400':  '400px',
            '500':  '500px',
            '600':  '600px',
            '700':  '700px',
            '720':  '720px',
            '770':  '770px',
            '850':  '850px',
            '950':  '950px',
            '1080': '1080px',
            'full': '100%',
        },


        /*
        |-----------------------------------------------------------------------------
        | Maximum height                      https://tailwindcss.com/docs/max-height
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your maximum height utility sizes. These can
        | be percentage based, pixels, rems, or any other units. We provide a
        | couple common use-cases by default. You can, of course, modify
        | these values as needed.
        |
        | Class name: .max-h-{size}
        |
        */

        maxHeight: {
            '0':      '0px',
            '100':    '100px',
            '200':    '200px',
            '250':    '250px',
            '300':    '300px',
            '400':    '400px',
            '66':     '66px',
            'flat':   '0%',
            'full':   '100%',
            'screen': '100vh',
        },


        /*
        |-----------------------------------------------------------------------------
        | Padding                                https://tailwindcss.com/docs/padding
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your padding utility sizes. These can be
        | percentage based, pixels, rems, or any other units. By default we
        | provide a sensible rem based numeric scale plus a couple other
        | common use-cases like "1px". You can, of course, modify these
        | values as needed.
        |
        | Class name: .p{side?}-{size}
        |
        */

        padding: {
            '0':          '0',
            '5':          '5px',
            '10':         '10px',
            '15':         '15px',
            '20':         '20px',
            '25':         '25px',
            '30':         '30px',
            '35':         '35px',
            '40':         '40px',
            '50':         '50px',
            '60':         '60px',
            '65':         '65px',
            '80':         '80px',
            '90':         '90px',
            '100':        '100px',
            '120':        '120px',
            '150':        '150px',
            '180':        '180px',
            'wideview':   '170px',
            'searchview': '170px',
            'button-y':   '17px',
            'button-x':   '29px'
        },


        /*
        |-----------------------------------------------------------------------------
        | Margin                                  https://tailwindcss.com/docs/margin
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your margin utility sizes. These can be
        | percentage based, pixels, rems, or any other units. By default we
        | provide a sensible rem based numeric scale plus a couple other
        | common use-cases like "1px". You can, of course, modify these
        | values as needed.
        |
        | Class name: .m{side?}-{size}
        |
        */

        margin: {
            'auto': 'auto',
            'px':   '1px',
            '1/6':  '16.667%',
            '1/8':  '12.5%',
            '100%': '100%',
            '0':    '0',
            '5':    '5px',
            '10':   '10px',
            '15':   '15px',
            '20':   '20px',
            '25':   '25px',
            '30':   '30px',
            '35':   '35px',
            '40':   '40px',
            '50':   '50px',
            '60':   '60px',
            '70':   '70px',
            '75':   '75px',
            '80':   '80px',
            '90':   '90px',
            '100':  '100px',
            '120':  '120px',
            '150':  '150px',
            '170':  '170px',
            '175':  '175px'
        },


        /*
        |-----------------------------------------------------------------------------
        | Negative margin                https://tailwindcss.com/docs/negative-margin
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your negative margin utility sizes. These can
        | be percentage based, pixels, rems, or any other units. By default we
        | provide matching values to the padding scale since these utilities
        | generally get used together. You can, of course, modify these
        | values as needed.
        |
        | Class name: .-m{side?}-{size}
        |
        */

        negativeMargin: {
            'px':  '1px',
            '0':   '0',
            '5':   '5px',
            '10':  '10px',
            '15':  '15px',
            '20':  '20px',
            '25':  '25px',
            '30':  '30px',
            '35':  '35px',
            '40':  '40px',
            '50':  '50px',
            '60':  '60px',
            '70':  '70px',
            '75':  '75px',
            '80':  '80px',
            '90':  '90px',
            '100': '100px',
            '120': '120px',
            '150': '150px',
            '170': '170px',
            '175': '175px'
        },



        /*
        |-----------------------------------------------------------------------------
        | Shadows                                https://tailwindcss.com/docs/shadows
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your shadow utilities. As you can see from
        | the defaults we provide, it's possible to apply multiple shadows
        | per utility using comma separation.
        |
        | If a `default` shadow is provided, it will be made available as the non-
        | suffixed `.shadow` utility.
        |
        | Class name: .shadow-{size?}
        |
        */

        shadows: {
            'md':    '0 4px 8px 2px rgba(0,0,0,0.12)',
            default: '0 2px 4px 0 rgba(0,0,0,0.10)',
            'none':  'none',
        },


        /*
        |-----------------------------------------------------------------------------
        | Z-index                                https://tailwindcss.com/docs/z-index
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your z-index utility values. By default we
        | provide a sensible numeric scale. You can, of course, modify these
        | values as needed.
        |
        | Class name: .z-{index}
        |
        */

        zIndex: {
            'auto':     'auto',
            '-1':       -1,
            '0':        0,
            '1':        1,
            '10':       10,
            '20':       20,
            '30':       30,
            '40':       40,
            '45':       45,
            '50':       50,
            '60':       60,
            '61':       61,
            '70':       70,
            '71':       71,
            'infinite': 300000000,
        },

        gap: theme => theme('spacing'),
        gridTemplateColumns: {
            none: 'none',
            '1': 'repeat(1, minmax(0, 1fr))',
            '2': 'repeat(2, minmax(0, 1fr))',
            '3': 'repeat(3, minmax(0, 1fr))',
            '4': 'repeat(4, minmax(0, 1fr))',
            '5': 'repeat(5, minmax(0, 1fr))',
            '6': 'repeat(6, minmax(0, 1fr))',
            '7': 'repeat(7, minmax(0, 1fr))',
            '8': 'repeat(8, minmax(0, 1fr))',
            '9': 'repeat(9, minmax(0, 1fr))',
            '10': 'repeat(10, minmax(0, 1fr))',
            '11': 'repeat(11, minmax(0, 1fr))',
            '12': 'repeat(12, minmax(0, 1fr))',
        },
        gridColumn: {
            auto: 'auto',
            'span-1': 'span 1 / span 1',
            'span-2': 'span 2 / span 2',
            'span-3': 'span 3 / span 3',
            'span-4': 'span 4 / span 4',
            'span-5': 'span 5 / span 5',
            'span-6': 'span 6 / span 6',
            'span-7': 'span 7 / span 7',
            'span-8': 'span 8 / span 8',
            'span-9': 'span 9 / span 9',
            'span-10': 'span 10 / span 10',
            'span-11': 'span 11 / span 11',
            'span-12': 'span 12 / span 12',
        },
        gridColumnStart: {
            auto: 'auto',
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
            '6': '6',
            '7': '7',
            '8': '8',
            '9': '9',
            '10': '10',
            '11': '11',
            '12': '12',
            '13': '13',
        },
        gridColumnEnd: {
            auto: 'auto',
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
            '6': '6',
            '7': '7',
            '8': '8',
            '9': '9',
            '10': '10',
            '11': '11',
            '12': '12',
            '13': '13',
        },
        gridTemplateRows: {
            none: 'none',
            '1': 'repeat(1, minmax(0, 1fr))',
            '2': 'repeat(2, minmax(0, 1fr))',
            '3': 'repeat(3, minmax(0, 1fr))',
            '4': 'repeat(4, minmax(0, 1fr))',
            '5': 'repeat(5, minmax(0, 1fr))',
            '6': 'repeat(6, minmax(0, 1fr))',
        },
        gridRow: {
            auto: 'auto',
            'span-1': 'span 1 / span 1',
            'span-2': 'span 2 / span 2',
            'span-3': 'span 3 / span 3',
            'span-4': 'span 4 / span 4',
            'span-5': 'span 5 / span 5',
            'span-6': 'span 6 / span 6',
        },
        gridRowStart: {
            auto: 'auto',
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
            '6': '6',
            '7': '7',
        },
        gridRowEnd: {
            auto: 'auto',
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
            '6': '6',
            '7': '7',
        },


        /*
        |-----------------------------------------------------------------------------
        | Opacity                                https://tailwindcss.com/docs/opacity
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your opacity utility values. By default we
        | provide a sensible numeric scale. You can, of course, modify these
        | values as needed.
        |
        | Class name: .opacity-{name}
        |
        */

        opacity: {
            '0':   '0',
            '25':  '.25',
            '50':  '.5',
            '75':  '.75',
            '100': '1',
        },


        /*
        |-----------------------------------------------------------------------------
        | SVG fill                                   https://tailwindcss.com/docs/svg
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your SVG fill colors. By default we just provide
        | `fill-current` which sets the fill to the current text color. This lets you
        | specify a fill color using existing text color utilities and helps keep the
        | generated CSS file size down.
        |
        | Class name: .fill-{name}
        |
        */

        svgFill: {
            'current': 'currentColor',
        },


        /*
        |-----------------------------------------------------------------------------
        | SVG stroke                                 https://tailwindcss.com/docs/svg
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your SVG stroke colors. By default we just provide
        | `stroke-current` which sets the stroke to the current text color. This lets
        | you specify a stroke color using existing text color utilities and helps
        | keep the generated CSS file size down.
        |
        | Class name: .stroke-{name}
        |
        */

        svgStroke: {
            'current': 'currentColor',
        },


        /*
        |-----------------------------------------------------------------------------
        | Modules                  https://tailwindcss.com/docs/configuration#modules
        |-----------------------------------------------------------------------------
        |
        | Here is where you control which modules are generated and what variants are
        | generated for each of those modules.
        |
        | Currently supported variants:
        |   - responsive
        |   - hover
        |   - focus
        |   - active
        |   - group-hover
        |
        | To disable a module completely, use `false` instead of an array.
        |
        */
    },

    modules: {
        appearance:           ['responsive'],
        backgroundAttachment: ['responsive'],
        backgroundColors:     ['responsive', 'hover'],
        backgroundPosition:   ['responsive'],
        backgroundRepeat:     ['responsive'],
        backgroundSize:       ['responsive'],
        borderColors:         ['responsive', 'hover'],
        borderRadius:         ['responsive'],
        borderStyle:          ['responsive'],
        borderWidths:         ['responsive'],
        cursor:               ['responsive'],
        display:              ['responsive'],
        flexbox:              ['responsive'],
        float:                ['responsive'],
        fonts:                ['responsive'],
        fontWeights:          ['responsive', 'hover'],
        height:               ['responsive'],
        leading:              ['responsive'],
        lists:                ['responsive'],
        margin:               ['responsive'],
        maxHeight:            ['responsive'],
        maxWidth:             ['responsive'],
        minHeight:            ['responsive'],
        minWidth:             ['responsive'],
        negativeMargin:       ['responsive'],
        opacity:              ['responsive'],
        overflow:             ['responsive'],
        padding:              ['responsive'],
        pointerEvents:        ['responsive'],
        position:             ['responsive'],
        resize:               ['responsive'],
        shadows:              ['responsive'],
        svgFill:              [],
        svgStroke:            [],
        textAlign:            ['responsive'],
        textColors:           ['responsive', 'hover'],
        textSizes:            ['responsive'],
        textStyle:            ['responsive', 'hover'],
        tracking:             ['responsive'],
        userSelect:           ['responsive'],
        verticalAlign:        ['responsive'],
        visibility:           ['responsive'],
        whitespace:           ['responsive'],
        width:                ['responsive'],
        zIndex:               ['responsive'],
    },


    /*
    |-----------------------------------------------------------------------------
    | Plugins                                https://tailwindcss.com/docs/plugins
    |-----------------------------------------------------------------------------
    |
    | Here is where you can register any plugins you'd like to use in your
    | project. Tailwind's built-in `container` plugin is enabled by default to
    | give you a Bootstrap-style responsive container component out of the box.
    |
    | Be sure to view the complete plugin documentation to learn more about how
    | the plugin system works.
    |
    */

    container: {
        center: true,
        padding: '2.2rem'
    },

    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),

        function ({addUtilities}) {
            const newUtilities = {
                '.scale-105':    {
                    transform: 'scale(1.05)',
                },
                '.scale-1.2':    {
                    transform: 'scale(1.2)',
                },
                '.skew-15deg':   {
                    transform: 'skewY(-15deg)',
                },
                '.object-cover': {
                    'object-fit': 'cover',
                }
            };

            addUtilities(newUtilities);
        }

    ],


    /*
    |-----------------------------------------------------------------------------
    | Advanced Options         https://tailwindcss.com/docs/configuration#options
    |-----------------------------------------------------------------------------
    |
    | Here is where you can tweak advanced configuration options. We recommend
    | leaving these options alone unless you absolutely need to change them.
    |
    */

    prefix:    '',
    important: false,
    separator: ':',

};

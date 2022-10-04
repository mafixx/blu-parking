import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

export const commonStyles ={
    rowSpacing: {
        margin: 5
    },
    colors: {
        primary: "#1a73e9",
        darkBlue: "#0a51ad",
    }
}

export const theme = {
        ...DefaultTheme,
        roundness: 1,
        version: 3,
        colors: {
          ...DefaultTheme.colors,
          primary: commonStyles.colors.primary,
          elevation: "level0",
          background: "#fff",
          secondary: '#f1c40f',
          tertiary: '#a1b2c3'
    },
    fonts: {
        ...DefaultTheme.fonts,
        fontSize: 32,
    }
};
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## As this project is created in Vite using React:

1.To run this type "npm run dev" on the terminal.
2.For Running the app locallly use this URL : http://localhost:5173/.

# React useFilter Hook

## Overview

This is a custom React hook named useFilter, which provides functionality for filtering data based on specified filter functions.

## Usage

The useFilter hook takes an initial data array as input and returns an object with methods to add, remove, and reset filters, as well as the filtered data.

## Importing

Import the useFilter hook into your React component as follows:

import useFilter from "./useFilter";

## Initialization

Initialize the useFilter hook with your initial data array. For example:

```react
const initialData = [
{ id: 1, name: "Item 1", category: "A" },
{ id: 2, name: "Item 2", category: "B" },
// Add more data items as needed
];

const { data, addFilter, removeFilter, resetFilters } = useFilter(initialData);
```

## Filtering

You can add filter functions using the addFilter method. Each filter function should have the following structure:

```react
const filterFunction = (operand, item) => {
// Implement your filtering logic here
};
```

## API

```react
useFilter(initialData)
```

Initializes the useFilter hook with the provided initial data array.
Returns an object with the following methods and properties:

### To add a filter function:

```react
addFilter(filterFunction);
```

### Removing Filters

To remove a filter function:

```react
removeFilter(filterFunction);
```

### Resetting Filters

To reset all filters and revert to the initial data:

```react
resetFilters();
```

## Dependencies

This hook relies on React's useState and useEffect hooks for state management and side effects.

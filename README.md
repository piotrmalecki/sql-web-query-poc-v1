# SQL query web proof of concept (Vue 3 + TypeScript + Vite)

Application is available [here](https://sql-web-query-poc-v1.vercel.app/)

Please note that sql queries do not return actual result, but only mock data, that comes from ts file. There are 3 data chunks that app contains (products, orders, order details) from [here](https://github.com/graphql-compose/graphql-compose-examples/tree/master/examples/northwind/data/csv).

User can choose one of queries defined next to textarea or write its own. App supports dark and light modes. Records are dynamically loaded when users scrolls down page.
![3](https://user-images.githubusercontent.com/3989677/196513971-fb128b86-0f18-4f63-8fd7-cc6eb63a18d3.png)

When user clicks on row, there is modal window, in order to present row's missing data (Products and Orders).


External libraries used in this app:
    1. vue-router
    2. pinia
    3. @vueuse/core
    4. windicss

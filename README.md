# SQL query web proof of concept (Vue 3 + TypeScript + Vite)

Application is available [here](https://sql-web-query-poc-v1.vercel.app/)

Please note that sql queries do not return actual result, but only mock data, that comes from ts file. There are 3 data chunks that app contains (products, orders, order details) from [here](https://github.com/graphql-compose/graphql-compose-examples/tree/master/examples/northwind/data/csv).
User can choose one of queries defined next to textarea or write its own.
Records are dynamically loaded when users scrolls down page.
When user clicks on row, there is modal window (Products and Orders), in order to present row's missing data.

External libraries used in this app:
    1. vue-router
    2. pinia
    3. @vueuse/core
    4. windicss

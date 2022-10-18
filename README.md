# SQL query web proof of concept (Vue 3 + TypeScript + Vite)

Application is available [here](https://sql-web-query-poc-v1.vercel.app/)

Please note that sql queries do not return actual result, but only mock data, that comes from ts file. There are 3 data chunks that app contains (products, orders, order details) from [here](https://github.com/graphql-compose/graphql-compose-examples/tree/master/examples/northwind/data/csv).


External libraries used in this app:
    1. vue-router
    2. pinia
    3. @vueuse/core
    4. windicss


User can choose one of queries defined next to textarea or write its own. App supports dark and light modes. Records are dynamically loaded when users scrolls down page.

![3](https://user-images.githubusercontent.com/3989677/196513971-fb128b86-0f18-4f63-8fd7-cc6eb63a18d3.png)

When user clicks on row, there is modal window, in order to present missing data (Products and Orders).

![2](https://user-images.githubusercontent.com/3989677/196513970-4402f4c8-b614-416d-a78d-662623a68e13.png)

Web app is designed and implemented for desktop and mobile devices.

![1](https://user-images.githubusercontent.com/3989677/196513940-f753564d-c4ce-41a1-8f67-d99606f84964.png)


Lighthouse metrics:

![6](https://user-images.githubusercontent.com/3989677/196517810-152ac590-0b34-4e6e-a1b2-5f8bb79dd1e2.png)
![5](https://user-images.githubusercontent.com/3989677/196513968-bc69c40e-b4e8-43af-b706-65f023d3cc05.png)

# 1. Verify the reservations dates. 

The dates were set for `2021-04-10`.
File that contains reservation data: `/public/mocks/reservations_all.json`.
You can also add / remove the reservations respectfully to the data structure:
```
{
  {deviceId}: [
    {
      from: 'YYYY-MM-DDTHH:mm:ss',
      to: 'YYYY-MM-DDTHH:mm:ss'
    },
    ...
  ]
}
```

# 2. Run app

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


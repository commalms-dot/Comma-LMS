declare module "react-select-country-list" {
  interface Country {
    label: string;
    value: string;
  }

  const countryList: () => {
    getData: () => Country[];
  };

  export default countryList;
}

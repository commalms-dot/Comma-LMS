"use client";

import Select from "react-select";
import countryList from "react-select-country-list";
import { Controller } from "react-hook-form";

interface CountryOption {
  label: string;
  value: string; // country name
  code: string; // ISO code (EG, US)
}

interface CountrySelectProps {
  control: any;
  error?: any;
  name: string;
}

const CountrySelect = ({ control, error, name }: CountrySelectProps) => {
  const options: CountryOption[] = countryList()
    .getData()
    .map((country) => ({
      label: country.label,
      value: country.label, // ✅ store country name in form
      code: country.value, // ISO code for flag
    }));

  // 🇪🇬 Convert ISO code → emoji flag
  const getFlagEmoji = (countryCode: string) =>
    String.fromCodePoint(
      ...countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt(0))
    );

  const formatOptionLabel = (option: CountryOption) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 18 }}>{getFlagEmoji(option.code)}</span>
      <span>{option.label}</span>
    </div>
  );

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            options={options}
            placeholder="Select your country"
            formatOptionLabel={formatOptionLabel}
            /* ✅ THIS IS THE KEY FIX */
            value={
              options.find((option) => option.value === field.value) || null
            }
            onChange={(option) => field.onChange(option?.value)}
          />
        )}
      />

      {error && (
        <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default CountrySelect;

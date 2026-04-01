import apiSlice from "./api";

export default interface Vacancy {
	id: number;
	title: string;
	jobLink: string;
	downloadLink: string;
	keywords: {
		id: number;
		name: string;
	}[];
}

export const vacancyApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		vacancies: builder.query<Vacancy[], void>({
			query: () => {
				return {
					url: `/vacancies`,
					method: "GET",
				};
			},
		}),
	}),
});
export const { useVacanciesQuery } = vacancyApiSlice;

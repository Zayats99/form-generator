import useSWR from "swr";

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { useEffect, useState } from "react";
import { FormGenerator } from "@/views";
import { set } from "zod";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Form = () => {
  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data, error } = useSWR("/api/formScheme", fetcher);

  const [formScheme, setFormScheme] = useState([]);
  const [formData, setFormData] = useState({});

  const handleSubmit = (data: any) => {
    setFormData(data);
  };

  useEffect(() => {
    if (!data) return;
    setFormScheme(JSON.parse(data));
  }, [data]);

  return (
    <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
      {error && <div className="mx-auto">Failed to load</div>}
      {!data && !error && <div className="mx-auto">Loading...</div>}
      {formScheme.length && (
        <FormGenerator
          formScheme={formScheme}
          handleSubmitForm={handleSubmit}
        />
      )}
      <pre className="mt-3">{JSON.stringify(formData, null, 2)}</pre>
    </Main>
  );
};

export default Form;

import { useEffect, useState } from "react";
import { useParams } from "react-router"

async function retrieveSurvey(id: number) {
  console.log(id);
  const req = await fetch('/gospring.json');
  return req.json();
}

export function Questionnary() {
  const { id } = useParams();
  const [surveyData, setSurveyData] = useState<any>(null);
  useEffect(() => {
    retrieveSurvey(parseInt(id)).then((data) => setSurveyData(data));
  }, [])
  return (
    <>
      <code>
        {JSON.stringify(surveyData, null, 2)}
      </code>
    </>
  )
}

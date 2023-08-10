import axios from "axios";
import Cite from "citation-js";

const apiEndPoint = process.env.apiEndPoint;

const parseCitations = (citationsResponse) => citationsResponse.flatMap(({ citations: c }) => {
  try {
    let cleanedCitation = c.source_citation.replace(/\\n/g, '')
    let parsed = new Cite(cleanedCitation)

    let formatted = parsed.format('bibliography', {
      format: 'html',
      template: 'apa',
      lang: 'en-US'
    })

    let raw = parsed.format('bibtex', { format: 'text' })


    return { 'source': c.source_name, 'parsed': parsed, 'raw': raw, 'formatted': formatted }
  } catch (error) {
    console.log(error)
    // returning empty vector will make flatMap drop it
    return [];
  }
})

export const requestCitations = async () => {
  const parseObject = {
    opts: {
      mode: "citations",
    },
  };

  return await axios
    .post(apiEndPoint, parseObject, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      let parsed = parseCitations(response.data)
      return parsed;
    });
};

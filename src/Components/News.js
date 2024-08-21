import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  let { setProgress, apiKey, country, pageSize, category } = props;

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const staticData = {
    status: "ok",
    totalResults: 92,
    articles: [
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Reuters",
        title:
          "LIVE: Sturgeon Blue Supermoon rises behind Greece's ancient Temple of Poseidon - Reuters",
        description: null,
        url: "https://news.google.com/rss/articles/CCAiC2k2S1ZnMVFjWDZrmAEB?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T17:27:40Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "The Times of India",
        title:
          "CPM leader Sitaram Yechury admitted to AIIMS ICU due to pneumonia - The Times of India",
        description: null,
        url: "https://news.google.com/rss/articles/CBMizgFBVV95cUxOVDY4Q2ZXdXhZTWY5ZmZpTF8xR2d5U0Q3QURfN3d3dTFKSW0xYjY3dU40bVRhNUhnWFlGNDNEQTNQUW10YzVzSXE5SlRRdm5STmk4b2V4YUt2QS1RX0NBLTF3ODlrdWNkamZiYnNNbU1zc1JVYTVqV04xWk9ERXY4LVFYMTNQS1VsT3dyTVR6alNHdU1NSVFVeTJfMjVQN2pKbVJGVXZIMDNjRE8xUlpXTW9jR09RNzFZQWVFVjJLNG1LU3lhdGwtdjV4bjRBQdIB0wFBVV95cUxQTXZrb3hHRWVUMzZkX0FCYWdVQ0N4cHdCWlZqR0JWcHZKdUxFT0puSVNGSm9NUm82N1VWZ2hhamQxTEIwNlZ5S3lDMUk2OTZlS29NNmx6LWVDbGUweFBFRjdTZnhiS3VoMG9oTktQMC1SalZ3cVlBLVF5UXZVZFk0T2l5STdFRWVuWUVVT2pHQ3lMMFQ0QldxMlMyY2hibEthQVdpR0JPSDUzb1JDUk1RN2tNNmVERDUxTmdCT1RGTTBiOTlCdGRPZS0teGNFZEZ3T3Vn?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T17:14:00Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Morung Express",
        title:
          "African scientists warn of surge in mosquito-borne diseases amid climate change - Morung Express",
        description: null,
        url: "https://news.google.com/rss/articles/CBMiqAFBVV95cUxObWpZMkFwYk5Ec2JZZko0azUtYVF3WGRqWEp3cFRXSGozaTdqOVd2YkVLdGRFdlRfbXNpb29za3NCY0ptcFFfbzFqa1lMVFJqYXduV1BXVERocXQxVGV3TXVVT1RQYUNBRE9NSUhkMEZGY3JyZDRCZldfRlY5ZEpzOC1lczJnRjdzY19WQmNBVVFMU1M5OFFRWlJuS0VWeHJVei1VNXNsWVI?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T16:46:12Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Reuters India",
        title:
          "Indian medics refuse to end protests over doctor's rape and murder - Reuters India",
        description: null,
        url: "https://news.google.com/rss/articles/CBMiqgFBVV95cUxPUGIyYjBPVFl2SU5TaHNlWlJOSmFvaUxNclJ5NzcxckNNZWF1R2ZwSkJXN1A1ZWdFYnFnN2ZKSUpsMVZGcDFNZktST1RzbDVKYnpPNVZrRklEeWYxUXp4MVlPekpNTE43OWJpOFlDdlE2ZnYwdWZqY3FtazNPSlFtZy1UcjFpZW56d1V2MGJfel9YbzZPY01QQndxSmZaX0FaVEZNTmRzQVpoZw?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T16:45:00Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Hindustan Times",
        title:
          "Will Vijay continue to act after joining politics? The GOAT director Venkat Prabhu has the answer - Hindustan Times",
        description: null,
        url: "https://news.google.com/rss/articles/CBMihgJBVV95cUxPUHBiTVhIUTB0VjZ5ZGdQQVJPWHdfLVNYMXN1bWFJQ3FBUC1iRTdnbVZ5cUE1M1ROOGRyWldMYXRZLVZLUGlEYXRIMkpTbUNBNnlDOEoyYmVNSi1NbnI0RHB5eW45ellNcVFLRFZzVnRzSzNlMFhwZ0hrTVF6OG1DVW4zb2N2OXBlcThYaDktemFnWUxEalZVdHBfQmVGSWhOc2t3STV6WXpldDBTYkdIXzV5RGkwUmRfWHZORjdyWmwwZGlHNWpuVFRSNTYtLWdha0o5RkRZc2xpWUtidW4yMzlPd2t1QkM3RE9QSHJKTDVPcjNKazJiZWNRc3ZpTXQ3WEk4T3ZR0gGLAkFVX3lxTE9FSGZ1X1B2S2EzdkhwcDZ5MVZOWGxVS1pOdGozMS1HeGN2d0VaeXZsTk43WEsydmhQNFhVd1l5MHNxTVlpZjh2SVpyRzFXOThLNHZJMnpQcDZxVlFMT2dMQmtLMkdoQ3ZWQVlHeHhsZjdzYzBTRWlUdXBkdGxxS1pKaWVTTEI1OVlwc2NRUFNmdk03MmFRVFU2VGZTcE85Nmd3d2FFdnJoWmN4azVGdW9SeEpNWXlKOF9ic0pmdlpDWDVhNGdzd3hRZ3JVbVEwbUs1aEJSUU9TbXBMcmcyMTQzSnRtZW9QbTlPVjcxSmdRRFFVbEhGQ0JoaUVsZ1F4OW1kNFhwUTgwaWhQMA?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T16:21:30Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "The Hindu",
        title:
          "Karnataka gearing up to handle any outbreak of monkeypox, says Health Minister - The Hindu",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi3AFBVV95cUxNeTdwamF6QTVxWlc5MzcxY1o0SzlUX3k3Z1drc2t3ZjVkc21TRi1PN3YwNnIzSS1rTkRjWV9COVctYmJHMmJjUUxJNUVJTlFmRWNBY0luWVByQ2dQQWxNNlFUMGNkbXFfUHVOMTdHYkcydTlEdEZabmRXUFJfQklVU1ZKcVc3R01CWW5CcnNjV3B2amRhVjNpcmxMTC1WcVJDWFJpZUh5SWJvZTRDNzBfUHpncnJNNmQ2NDloVzdzQlFxMDBlVmp5QVhlWnhqQV9XVWZHMlllREt5VWM00gHjAUFVX3lxTE5EaC01YktfUXZVRXZUeTNxY3gtUDZCb0t5WXR2Q2N2eUlhdl9WUURyWnIwSm5kUmdCS1Y3cTlmUk9LWWhuUzhSdXk2amh2cklqSlZKemdzQUN4VnNmczJjd05Fa2VhTXVMMnBSN29zaXJJZmxfTmNSZUZJOERlYW00VnRLQmhVcHZSTG9UNi1TQzFnOGtwLWhXREtmVG5pQkRjclZGOG0yd3JESU9yMGx0dUNFdXA5U3N2WmNTd3hZbzI5Ty1WQ1pZVUdqdF9XeEJoM2tJelVXRE5RQ1N0MG93cFE4?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T15:55:00Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Hindustan Times",
        title:
          "On Rahul Gandhi's criticism of Modi govt's lateral entry push, Arjun Meghwal invokes ex-PM Manmohan Singh - Hindustan Times",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi-AFBVV95cUxOS3Rfc0QyeGg2OGJOWm9DdldjbjExLWVnUHpTSnJxSEw2RVRjYjVrc2FSaTg0QmdvWmZldWNhMDd0cXB2U3NfVEtjMlJxMTFZNmtvTE9SNlpRaUM4TUNaaU9zSFZndTFXRzNJODBhamtLYXYxekRBYjlEYUNkYkhfQlNKWENfMmVkRUNTNndETk1wUGdVUmtpS283YkVnZTZzUEYwU1oyT1NtWkI3cFZPcm80MVNKREJJRmhRZkROazZ2aTljRGtDQjBEOFdETFBFVWZ1N0dQVE5wWkYxeWV3WWtwSmhyZ0RPVWREZ0dSV2F4Sm9xa2NzbNIB_gFBVV95cUxNMFZyN1V5bU9UeFFtcWdTYXNQMUhRd0JSbUpDWG1mVDJGNzFVWVFKS0swYTVuZHpfSjZMLXdUVHkzOEdkazRvUk5QcjRHY21ueFRua0FyX3RBVmZ2Wkw4MWFHQ2h2RFFrb2liRnEwX0pnNFlJcWFqREo5T2paQ0tHTGxmZndISTVsNlQ3NU1PSUdsY2xzZVVoWGN3QTU2dW01OF9aNDdWM0tjejl5RUZLRnhNbmVxNTB1RERHMDlCSENJZmF0b3ZpSWhlQ2VIeFJHV01wQWQ3blk4Z3BXcDNVQmNrOWU2Y05qYVRhZzc4NnlKVFF1SDNjY3dMa0JhZw?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T15:53:42Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "India Today",
        title:
          "How Vinesh Phogat missed out on Olympics silver: Sports court CAS full verdict - India Today",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi3gFBVV95cUxOeG1EZU5UXzBDM1NleGJxSDRWYjl5R1VmVUdnc1dwbnY1dzRQSEdKanlwX2pKb1o3ZzlFT0FrQVBfRnd5cnctWnNxSDh1Qm1EY0Rsak5OUkZsR28zbWxHek9vQk9mN1BrQ0VmY3k4XzB0MVN2QUJRWXVfU2lud0lSVWRLNXE5eVcwdWRKTnNWSGNac1hRRG90VXNGYlpQQkpUazhLN2JITzlGbXVxcjlBREt3SS1GcVUwdmRLUm5GRXJjNWtEdndyTE1SV2VhT0xGcjZlYmJYLUdrMkpibHfSAeMBQVVfeXFMTThtSkM4R3dNUlA0dkdwOFltYkZLaWgzYkFCTGlPM2pXSUpuT1dwQXczcTBlallIcE9ZZW9vTkpBSzM3TWtGc3RkNzRLR1FaQ0tqczltS3B2VE9MUURUYWFKOS1Na3RqTDhDT3pXY0NNZjlqVzl0VE5kaEZ5Z09oa2gtN3BLem10TGF3TEhGSHNEdnc0UXdBeXkyUHBwWDRFUmpCcUJUTU5OSlFhMFVIME00Sm8zRGFRa05fSGcxa0g4Y2ZJTkF0eEpZUHpaMzlpd0czUVpKNF9yQ2xsTTZndFE1d0E?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T15:51:20Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "The Times of India",
        title:
          "Lucknow Super Giants in talks with Zaheer Khan to fill Gautam Gambhir's void as mentor - The Times of India",
        description: null,
        url: "https://news.google.com/rss/articles/CBMiigJBVV95cUxQUjMtLVphUWF6aURzcjREWEVud0hOUWJfZGx5a01ZWjFsT2VCUlBCZXZPd2d3RWRndUZIbGFRUi1aNEdTQllsRnlDQk1VTk9vQlFSTWJuaklIdS1RZmt2NkpwSExkZEwyalo1bnNoNjVMSk9QZUhkbWdGQ1hfcFBlSExGQmFFelNKOFl1THhDSjNlU29EbzNqTENVbmR6MXVFemRyejk2WGhIdzdKQ0tjV3VpT2gxdWlvSFV1TjBPcHo4d2xTQ1FmT245b1ctSGJTcUptS01WbXRHdXpyYTkybERkZ3paMW4zVXJkR2hZU0dwLU15SVJlN2RsYlZoNVRscFlCck1YMm9GQdIBjwJBVV95cUxQbXR1LUZnTTl4am5XNEJ5bmR5LVB0RVFHeVBDRFA4c0NqMURQUFdxNFp5Nzh5VTJqV1d0WWl4cXI2UjEtRkJFVzVDM3pUa0MzLVhxaC1nWnNjTWktbUNoMUhUQzhRSlUyN1FoMXptdEVlMWEyTUdERXlsRGVQSC1MaERKc0FyMWk4Z0tsaWJ5cER0djE1T0JPYXhaYmN5Q2RINmE5Z0NDaU0zR2dvZXU5N1JpNTZneER2SzVKaEl4b0pVVGJJM1l4SXdqSDJtMkJjOFJXYlBKNEppQmYxV1JqQnpXVzFqelBSWjVKek1UY0cxQkZJWlhJT2MxOTUwZ1locTIyX05rX0VBSjhKMklN?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T15:47:00Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Hindustan Times",
        title:
          "Stree 2 box office collection day 5: Shraddha Kapoor, Rajkummar Rao horror-comedy collects ₹228.45 cr in India - Hindustan Times",
        description: null,
        url: "https://news.google.com/rss/articles/CBMimgJBVV95cUxOdnJONjJhWXdIMVlDdzlMSjVBNW1DcW1TRWRfUjlGaVdDaFNKM1B3aUh6Q28yTUFvVUlsa1RuV3VBaWUtcWpEZkhTUnNLcUM3aE9RX3VFeGZTMmwyUjFJcjZHMmVjZXBRek1CSGlKYkh1MTdCQ1ZjVDB2TUh2Y29ZY0NidlFEb0o2MGhMeVFvQzU0aW4taHMtRC1JNTRiekdTZkxnQlN2ZWRHRTR6aDhGSXdRUGV3NmpsMElGU2NSX1hzTzJrTzZNQW1kWDJ0VUZxd2dyVHI3NUlKMTdudXlBUEY2NUNtSWVJbmp3WGN2MkNGUmdGeTg2STExRGlFWXh1QW05dzJUSmpEQi1xU0RzNjN4WU5iaVlKaXfSAZ8CQVVfeXFMTnIwNnlpQUNCRVROVjBWejg0c3dISHFOOXJITEQ5eDBOOHdtSGlTek9LTkdkVElMODRsc3VBeG1LemM1aDZwOTI1X1dCQlBZc3V5VU9adXVSNWgzWUliMnJ5UUd6ejFvTnRLY3JyZDB5QU9NMktrdjFaajhiZU5tUGozVThHdGtWVWtPQ1VvVVVaUzVSV05nTUY3dXFTMVdjcVdUOGRBd3JXSjkyRTRrU1N0cVBUdEVYVnp6WFBGc1V1ZElJY0dVTHJOYnJTYVNJNVN0d3NITWhpcS1pT0VYZVhIZllSS1VuWkJSQkQ2aVU5VTgxRFVMZjBXdEdBT0gwMTVxUGN4NERzM0NfeGMzNDBhWkNTak43R2hnQTZDS3c?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T15:46:59Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "The Times of India",
        title:
          "Does keto diet raise cholesterol levels? Experts comment on new study's findings - The Times of India",
        description: null,
        url: "https://news.google.com/rss/articles/CBMigAJBVV95cUxPWVFJelF0bHVlNnduMUdOanhrdGhHVEVYTllQc2x5T1F5UUtIVmZlMHhUWnBEMUt6Y2dLRUxlSHVXeDNvTDNrWFlGRlAwa1RnSTdmd2dTNmpPa09tSnlQdUFabEtSRWZzZldHczQtX21pYzNmUThncHVUVkRlTVoxa3Aybzh1bXhmYmVQMDZQVFk5TVFfMDhISWJHLVlqbjFkYTk1cXpnU1NlMUphWEJJM2pNRDUyWnhZRkYzdXpJd3JJblp0SkY5VkpsOXp6RHFKbXFidGs1dkd6SjBheF9ES2YzMlpUX1Bnc2VXZVdHMmlsUEh0T2ZZU3YzR202T1RK0gGGAkFVX3lxTE80NkZvX3dVQzhES3BSQVlaVTFCX1RXUDl2eXVOWVVXZnVLZWhoZ1Z6ajY4Ul9YYVllM2Q4cnJnZ2tFcURiQlpReGxIOHBEaDF3S3BsRWs4LVJ1c0xPel9IZWpYOUplQTd4QkNMLS1SR2pmSXR4dHh3cWpCemdGTGRYb0cteUdQUVhDTEdqTHRnNWNUYmdVNE5jRWVETkpEeW5adXJIeVQtdk5EMlRpbFQwOTBqRmdySEg4VFdGbkFDSXdvWVhQUXRHbHJ6bmpEeEo5RmpibjhPbUtlemc3RHcxOGw2VzZLQ215SEhfWVRTS0o5NkNpYTc1Vng0aG5YeXl2NFhBSlE?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T15:30:00Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Business Standard",
        title:
          "FM asks RRBs to devise suitable products aligning with MSME clusters - Business Standard",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi0AFBVV95cUxOZ29pS3U1TEloMWgtM2N1OW1ZYV9iZDB6c2RtS1dIRGtrMHNtSlpWWnV6ZndJaVJIaTNiaFpXR0NDSHFWeEtqYjNBcjYwVEZJVmFjcnluSUdCNzVKZDZMbGlaOTZQWWphUk1fNlFSanFjSlhTblRiNzJ2YjJpS0Q0VVdzX19Iem4wREFfdmZvWmVfaXA3bzFVaGFhZ3pxQzljM3B3eXUwbHY0SEJoVkJTYVgxNlZqTmxHYWR6Uzc3dk54cFFIcmZWejlEclpGWlpV0gHWAUFVX3lxTE14aE82dlBkUm5rUk82NTFwZm5XNUpLVHp0RFVONkpiTVpSWXRTcThTMnN2WjRITmQxX1R4NE4teXA1c3ZEeDE2Wlo4MDd0R2VQTG04VlNuSFhNbTlqYlhjMzZCTXBzX1JXMjJERkV4c2NXbDlaVmx6dGdXRXJGcTdrN0oxSEd1dnRqVWpsaXkydTZhRGJzNF9wNHB4a2QxN2NwRnJJQjA1TTlYdWVEUmZhOUd6WTYxWFZQeTFEanY0bHFLZmxZU2pfUDY1MEVmTndrWmVqMkE?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T15:25:52Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Moneycontrol",
        title:
          "Chew On This: RBI paper calls for cautious monetary approach as food inflation bites - Moneycontrol",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi4gFBVV95cUxPSG0zeE4tTTluRWlqOHJDTVJDMjJvU0tQcEdGazU5VENxWDR6QUNtT0FTLVhRNTV6Q3J1SmstM2NBZnMweTZPVjE3eXJITnl6Ynd3ZTYyc2I5bE9QbTdVTVJQZFdCY3RNV1k2NHAyWk51QV94NWU2ZHY2U0lKTzhyVmF0ZlZsaTA5UFdQNWw1T3JTMzI2UTI3bzdIVHV6OUxmWHczNVBaQlczdzRlcHBuVlJJSS1zeFRxaTJOVGJpdXFMZVhnd25KZG5KM05lU2Y4NV9ZYy1DTjBxTGgwMmtzd1pR0gHnAUFVX3lxTFA0bDBtakdIWkpueXYwN09JQzZmTnNDb09FWERIZEVBOGVCcm5zZ0Jfckp5SGZTV1llM1FPZmpCeFBhdzZGZU53M0R1VnlneEQ2MjQ3RXdyWUJhbm4zNW1fYkxaZ3VPb0JYLTBJVnBkRjJacVlWaTVCaERBMGp1UjlrU05ybm42d1RBRGZWYUdFVHlnenpKRUR4blY1bDJwWXNGay1kclBvNlBEakZ3TGxuaEpZUHVJa2VoSDJocUROY2RaTlBPcExpSUNJMU55blE0X1h1SGJTaU1OV2huTUZZdUdMald3VQ?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T14:49:58Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "The Times of India",
        title:
          "PM Modi to visit Ukraine for the first time since war with Russia - The Times of India",
        description: null,
        url: "https://news.google.com/rss/articles/CBMizgFBVV95cUxPY01xU0dfNm9qX0tsQ0tjZFZyR3hkdW9zYUJXRVdPTS1jMzNPYUpXMEZ1cXlDMkdPSU03WnR4QTlidEI0aVVRTVZNZjdhTlR6eWhib2hhYmd4cmRKaWdjemJSMC1oaE9pSVpKeE9GMk1rUmN5X0l1M3hqUXZyY3pBR3lTWVMxQXE4cTgzRTVqaGo1bHpsdGJRUkZrSXZMdHZiYmpMTWktLUVBYjBIY3MxdUpIODlXWHZzaVUxMnB4U2Z5Z1JYaWV1MGhKMXRjd9IB0wFBVV95cUxPbmZUOGpyMm9YMzMzR3plX2wxOE96Z0VlMDEtd0s2d3hWbDFPNVU0QXNUYklhd01Wa3hvbFdjOGJocE01NElZdVhBbGVaWWs2WE5aa0dzaXUwTGFUV3NWRWxlaUJWc01ISTAxV1prV2R1RWVPRmtVcHI5NnFUeF9mNkdobGtWR09QNHlxX2RYUWs5T3g1MldrT3l5R2Vkb3BUTGsweDh4RDNoVXRGRjEzU0s5U2ZBSFN3cVkwSHZtcFhrZmFQQ25RSHR6MVA1VmQyWHFN?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T14:41:00Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "The Times of India",
        title:
          "'Enemy is at the gate': Has Zelenskyy walked into Putin's 'trap'? - The Times of India",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi7gFBVV95cUxPeDltX0FfWGFxVVVfTWJzVGlUSHRYRGMxb3ZocUlOb2IyRHNWNHlUSU0xcWpCN2JpLWJ6cnBJMjhuR2k0OTRmMzloT3VNZnNGbTJZZnJYYXZNdmI2Qnh2YlFKcFVyWmRMQTB2NXdIcXhmTDNRb2VfZGprTllMMmZrN0tNVEtQZHhYSm5UOXZsa2wzcjBVamxZbk50a3Bod0JLWGlZYlZaV1p5ZTI1Mk5NMnpMcnhpUi1abXBya0M5NVhrVTNQT0RFTTlzZm1hNmdmOFRHQUZOZ0g1MExVN1FpMXNybldtY1o4LTlHN3dB0gHzAUFVX3lxTE5YYldjbUJuMTM5czQzY3c5bU40UDJrU3VJZl9uNTdKT3M1TEFMTi1GelVvUG41eU1NRkNCTU9RYlAyLW05SllLLTJzTmdpRDhNQmJjTkVmUzRJYnUyU2hCX0k0NDd3cnk0UUdVazJOYzZnRDQtRmxFRDU5SFQzemtGT3lpZ056TF9UcG02b0dXMFhyYU9ndlhlNjZucFFHYW5UY09WSlA0SldNemxJQU0zeUQyWkNjS1RXb21zVFZDbXZuZXhBc1QyUDFuUFhZV0VaTll4RVYzak05RGoxU1dvVEtNSG5uempKMTc0MHdtWEJRUQ?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T14:40:00Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "NDTV",
        title:
          "UK Tech Tycoon Missing After Superyacht Sinks Off Sicily In Italy - NDTV",
        description: null,
        url: "https://news.google.com/rss/articles/CBMiqAFBVV95cUxQMTBFMG4ydy1aRVg0YUdYRkFKOTlVQlhFVUgwWTBaeUI2TGp0dDFzR3FpRS1GbjVRYUlNVk9IRjg2S05SV01wdXhtWS04dFhTT3RfbjFrQ1c0ekRVVU1KRVpXbEp4ZlZpcXNZdUVmVDVsMlEtQUE0cWw2TnFEUV9DQ3ltQkVvRHd2MHdORTUxMUM5c254em10c2JiRkkzT3FFOGF4cW9ZZXg?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T14:17:57Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "NDTV Sports",
        title:
          "After Neeraj Chopra Silver, Another India Javelin Star Eyes World Record - NDTV Sports",
        description: null,
        url: "https://news.google.com/rss/articles/CBMixwFBVV95cUxPS01XSFpIcFRmYXhCeGZNRXBGTXB6UGJLOUlLdW1YU2RZdjJkSXBaSXR1cjd2eVg3Qi02T2dzT0t2eVJFV09fSW5IeE1QQjl4REo3cm5FakF1TWIzMGtxemN5a1hrYnlMeHZjODdyVUt1MmFGUU1Zc2JwWlZUX2U0cTYzajVsM1dWYWRVdk45Qy1sQWVTZVRNczcwNFdCektlYkJFa21EbEZ5aWV3My1LcWxrSHdKSmtCdnlvMUhpMkNIdkZTVFpr0gHPAUFVX3lxTE81NXRjZk4tVWoxZTJ4anVPT0d6bGNoT3VVclFaS3pUVkszdG4tc1BqdFBhQ3lKSjFqVDNEYkJIMjJyQjFMaksxeEVvVkFCZFpqX010MnNLcWdEc3BwQUVLVWNOQjZUWUd2cHlDZlkzM25rMTVMNUhLUmZ0clFfMFl2OUp3RFR0ZzFWb0Z0STJIaktIYWpCdXdhZDZWQklpcVlrakxqZUlWRHVuYkhLLTNQSWhPdmxUUjdCemFyd1ZaNlNxQnhJdVA4c0ZxdDhwZw?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T12:57:25Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Hindustan Times",
        title:
          "10-year-old’s curiosity leads to discovery of ancient dinosaur footprints on a beach - Hindustan Times",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi2gFBVV95cUxPWnN4UHRtSDJJUXBFS3BBZEJ4WGFwSEZIN0xXV1Q4YjdxaTB6WnBCb3VmeWZTeDJ2VmxhczJHUnBwckRJbzhmZkpKRzlWNTUxdHhDRWJRZHNOS3F5d05IckEya2JRekphYjFtUC02V2hUdWlvSHVpSmNDSXJxZXJRU3hwVk14QlluRHAyNVM3R3JQZUY5MkZxX2Z6YW9YbXhoM19CTVd4Y1N0VnpRTFJwMlJNOUJlRXNfa3NRNWM5Rng3S3VMN3V2NXJiNGRWQ3FfZjI4emdqcWhMQdIB3wFBVV95cUxPS25kTWRSWkUzWDlNR25adjhjWXVaLWM0ZjdEUlJpWkF0Tk5DZHdEblBuVzllczlJXzNHS1dCTWNvMWRDY2Y1RTM0UVVfTFFFMW1iQXhYSVVPNmFrT3lnbWFheFZlYmwzQ2JLbHJYVGdmT2hUbEh5blBRNWh0cTF6UDJoX1JyWDhvSnlQSDI3X1NNMnU2SW84SWZ2SzBJdHo5V2x1UGVvVExGUGRNVkhISjlnMU81TGNKOV9iR2xNQmJYRDBYeVFudUpjMEVCWmEwNW5IMUNwUktISlkwWDBz?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T12:41:14Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Onmanorama",
        title:
          "Powerful male lobby controls Malayalam cinema, ICC not viable solution: Hema Commission | Hema Commission Report | Onmanorama - Onmanorama",
        description: null,
        url: "https://news.google.com/rss/articles/CBMipAFBVV95cUxNOHNiYnJ6NFQydGRlZ1Z0WnM2aUxmbG5uTFN0VzFNYUIzREVBSVJzREZfQi1YS0hKS0x0bVIyOTEtQTZaSElhcGN5ZnhiSUxzY1Nxd09XZG8wZ0xCMmNKYTk2T0xWRTBHUk9CWC1Ba3dMZmZrWU9rVnUyNWlqQWlTUTVqYVdfWW0zenVJNVRzSmdkMTFZSC1kUGhxbGVHWjVENzd4bNIBpAFBVV95cUxNOHNiYnJ6NFQydGRlZ1Z0WnM2aUxmbG5uTFN0VzFNYUIzREVBSVJzREZfQi1YS0hKS0x0bVIyOTEtQTZaSElhcGN5ZnhiSUxzY1Nxd09XZG8wZ0xCMmNKYTk2T0xWRTBHUk9CWC1Ba3dMZmZrWU9rVnUyNWlqQWlTUTVqYVdfWW0zenVJNVRzSmdkMTFZSC1kUGhxbGVHWjVENzd4bA?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T12:35:23Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "NDTV",
        title:
          "Building-Sized Asteroid Approaching Earth At Alarming Speed Today, Warns NASA - NDTV",
        description: null,
        url: "https://news.google.com/rss/articles/CBMiswFBVV95cUxQamtEalk0al9wTHlLYW44SDQzNEptZTJZOElLXzlIRTRNYm5NX1gzUmEtN3c2YnlOYmdhdzZ4dmFnU093TXVBUFN1UmJWZDVBY3c1SUNtVEprRmJGbEVxQ1QzcmkyVUpETWNWQ3YtUTF6c2hGLXZjakE5UUJqeVZ6UXQwbFVQR0FyalZYM251b2JlVDFScHNDUHFCNGhmLUVGdFRqTzB5UzVuV3FSTXlGdTJsQdIBuwFBVV95cUxPTDhsRW9LOHhOQzVES3B0bS12X0N4OC1oc0Fka0MzWnN1WXhMTVhoT0tUQTlEcXlMUndJdEFfQzR3aG5UdTFZWndrRjdNbzY2MW90VElxVEFCMTNUOGktNVEySUY1b3F4VGZpdmlyRUxOd25ETE92N3Zib2llQnFZcHNZQzgxOVVSemYzSmxhUG1UcGJuNTB2V0NkOXlYS3B4YjNxS1RfNllVbmdoWmoxUm94eGhjVnJuRHA4?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T12:33:03Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Firstpost",
        title:
          "Apple iPhone 16 Pro designs LEAKED before launch, will come with new bronze colourway - Firstpost",
        description: null,
        url: "https://news.google.com/rss/articles/CBMiyAFBVV95cUxOM1JYTUhtNDQ1LWwwcy1Wb1otSm1jUktSOGxJNjhPcTlRMjE3cXRhcERXRFBrY1pJOWdRRmZ1WTlncnptd2JoUklfc2N0Y2c5Zm1NQkJxMWhHbW1kaFhuOUFGd0NTejBFS0VfUkpMZXlIS01jM3J3ZXl3RXVPV1FFVUFRQ1JQcUw3cHFPWDNEeExmQUpkd2wzUEpNcUEtYVlHb0VVTWZLTDQwM2s4Tkdmak1yMEhKOE1kYk5hc3h4UEUtWlJpZFIzRdIBzgFBVV95cUxQamNOeFlzQlZqVExXemEyUjZFVThWT05sZVRtYzhIUnJrSGRVcnM5RWlJdjdueGRKN19RSjRRVkwxRVhVeWViUzY4RGExSkgyYVNUSGFEZ3FNWGs5X0ZpQW5HQXVRV0x2cGhRSnZxQ0RpQ3hYSTVEd2l5VzBmdGp0QWxnSjVSdXFyc2VVeUhwcFpVb0daay1Ocy1obldUdmI3TjllOVVfSFN4d2dmYk53MnBiam1aZ201VVhLd1FhcmxNanhXT1FVV2YwYmJ1UQ?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T12:07:07Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Moneycontrol",
        title:
          "Rules for Digital Personal Data Protection Act expected in a month: Ashwini Vaishnaw - Moneycontrol",
        description: null,
        url: "https://news.google.com/rss/articles/CBMirwFBVV95cUxNbTZJNHF6WDFoZmFvQ1FkeFhIem1MMjZIMWptcl9pbTZ3bmt4b0QwMHFjVUFqbVo2UW1DclEzOWhabkRhaDJmQUx0R0NNM2xqa2l4UDNMVk5ORkhUU2NkbGlST3dHU2ZXTVk1SFhXMGEzTEJUSk5LMVhzUVZvbTQ2MmRjQmJFS0h1dTdjNmlQQXc5a1pwd25ZdnRnOVdGSUtBbTkwTF93cmFCUnNCMmhF0gG0AUFVX3lxTE15MG8yNnRRNUxGdzVMMGxwUXQwS01reXRMTXJCWHo5QVhiQlFqeUZkWHp1VlhZVVVxdVQ2UC1NaXlyQVowMnUwZlRUYklKTVo0eGZFc3UxOEFFaWR6a1BKWE9OOGpsMUFjQnNIMGF4dkhSS0FMNlpVaFcwbnhId1U3M0VxOG1sajJsOUZYYk9EQW1iR2xsUG1EV0NMNXlGLU9vSV9ZUWxEVGgyS2hid2RMQ2Q0aQ?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T12:06:40Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "NDTV",
        title:
          "\"Illegal...\": Siddaramaiah Slams Governor's 'Prosecute' Nod In Land Scam Row - NDTV",
        description: null,
        url: "https://news.google.com/rss/articles/CBMimgJBVV95cUxObzV1Q2VyZTRHVThDMVIwdlZFUE54Smd0dXBVY1pRbjNWNlhjamc1NmxLdGdOUGJhbG1HNEVKR3IxRmNtRlI1OENHY2R3bFl3ZXpnbmZ5Um1jemI5SENtaGdlbEZuU05TeWVBazEwMUduZFhjWGtvaWVacXpSWUZkd2xocVdFel9EaXgwcnc2U2prNWVDbUR5bUxyeFBidjhJU1I1eXFuWS1zSGl4N3JFRnJzbFFiMDRBN0o0OFItcFc5ODYtdUt3akppZXBUaUotNFhNRW9ic2tmSjVjdFUyYTFYNDhobmhWSmFOM1hncTFHSnQyd0pxeXk2VnowazdPQ0trVHJwVlZwSHI0Y3dPVnFUeWZHYjA5U2fSAaICQVVfeXFMT29ZbkZOdFUzNlZDZ013NjJYRDUxT3BEOFJWM3JlWFJOMEVYWUxiZ3VxVTNPN0RiVy1ubHdSOERYbGJUaWhXS1dLRHQwTUUwRy1Ecm8tNU05ZkdMM1ZQV2RaNWx5QjF1RFJzR0o5SkJoTk1lZU93cFNjN1JnenR2VEVTMlFVWnlaY1ZxRlZmNjRnemVHMnZuOGZTNFhhbWNjUzJwWE1ZVzR3cXRwUWRKclhtUUliZ3Y0dDhSZFViT3pnaGwtUFlhcm14U043bURmTGNEM0YtdlpkQnAxWXlmaUFhclpUQmViRGNvQU5XQmhPR3VxQnJONWcwUm4wNDFGdnFDMGI2c2t6WU5jLU9aVXVDUFM0SDh1alR5Wk9ZNmlVTHc?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T11:56:00Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "NDTV Movies",
        title:
          "Raksha Bandhan 2024: Saif Ali Khan, Kareena Kapoor, Soha, Sara, Ibrahim's Annual Famjam. Bonus - Taimur And Jeh - NDTV Movies",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi3gFBVV95cUxNbVhNak1aamRZaDBqbFRjMGd4NlhRbjdCeVZHdkYzbG44Vmd3VDJwTXhtcjJEalNjSmF6TGlReFJpM3ZrU09MMTRKaFBFWDB2MXhMTW45LW5lN0taeDNwamVzMDNSWUNWZjJhNFRKdXl2M211WTJTaTRrRk1uRFFSUC1ob29HdXI4WEpEYmxDbEk3bnJJNUdRMEFoeUtNcThyUXRoMVJpUUdiZDlpd2lkTzNUZklDVl9QZmcwVE51QU1XdFJKQVRrRGZncWNRcVVNNlhid1hIQ0dOa0tuZnfSAeYBQVVfeXFMUHd1Z0QwQ1lBWnZMQ3dsUHFON1JKeDgwVU1fb2VVSFlqZVZFY1ozUFYybWx5NnRBcXE3a0lNOU9QTE1xQVNyYXFuc0JIQnNnRTdDYUlTbnRYcXBRbGNlMmEwVkF3THZHckpvU2Z5SmdzNWluT3B5RlFGa1c3LUVyb1FYc3h4Q2F5SmlLN01HVVlETS1oVGgxc1pnQkNkNWxjMUJ0ekkzSnk0UzRIYXpwcC0xeVpadXh5MExkeC1wSU9BVm9YSUYxOExLRWR5eGZ5MVVtSWVxaEU1Q2RucXVZb2JHbmFUcGc?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T11:21:04Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Bollywood Hungama",
        title:
          "The Buckingham Murders: Teaser of Kareena Kapoor Khan starrer to be unveiled on August 20 - Bollywood Hungama",
        description: null,
        url: "https://news.google.com/rss/articles/CBMivgFBVV95cUxOLTkxdnE1S1BiQ0VJb0MwRC13ZEJvb0dOZzBnMy1ra2Z2blo5YnBWdktoaGxXb1diRFBhbkVoSXYyeHJ0OG9haGV3ajAyY3liZWRDWHlJbjBEaDBCWnB6LTIxcUNpcFYxWGhxMFZxVnpYbHJzWnZzN3g2UUhJZ1BFZC1va0hpV3lGMXltdFF0R0k0ejh2S09aUkVub2NKTkpIZmlWVnp0bHdTUmFzOVpzcXBycW5iajdCVXAxNjN30gHDAUFVX3lxTE5RZmpIaTc5dEFIN3NyRy01UV94XzFWbjlwdWZPenVPeVBSMEVlVjVpQ2tSVTBPR3ZId3N3UlFMVnZMU2F6bEEwV2l3cXNTdndRZ3A2NmIyN1QtbFdQbDlHSEliaWRScC1QUVhkXzI1dkU2SmlhckIxQndOajhQZHhuOFFqOVJSXy16RWlxZ0JIZENmMFMzR01iMmN0MjA3dTFkclBrQmVOaW5qT0VIa2FNR3ZmZGZSYkQ4RXJ5NVJkeHNLTQ?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T11:19:15Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "The Indian Express",
        title:
          "How to pre-order Google Pixel 9, Pixel 9 Pro XL in India: Offers and benefits explained - The Indian Express",
        description: null,
        url: "https://news.google.com/rss/articles/CBMixgFBVV95cUxQQ0ZZVHFCTDZtcW90eDEyX3hXM243enBvbC16bFlsQ2xmLWtRaFBRanh2MVRFQU5nQTVueXhXMGQ0TDNZRmY5SHBMa25HQk9xN05IRFlxbEE4ZjZEVVhFSG9oMlBIVU80Sjd3WlBaUURrUjN3TjRabkpfeS03dng5bnF3b3djQV8wZTJaYWlWY1Z4QjhCc0hiVGRyM3lzWGU5bkYtS29veTZzS0dMNlZBOWotbk5CbDRFVUdqcHRYandrQ0NDUmfSAcwBQVVfeXFMTU45b3BIcGpWOUNXd0RFb3hVVXZDbWFPQllaaE5wQ3BYSHVoOUhWaHdQMDlST3VJaFZJTFY2LWFlZ1g1YVpvTmxnb0pjWmZuaG41YzlVYUlvNG9YbVBidTgtcGZlVUVBX2VKbUhGX3ZIaVRoc3Qtd0xybmhUdmJyYzNyM213T0RJTEJ2dVRlTi0xR3pkZC1WZ3dsb0tSbUFiRUczVVNPU2dpT0oyX21MdDUyeUlESkw3OFNQYnpTLXpKU1FGV3JlOS1iamR6?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T11:08:54Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "The Hindu",
        title:
          "Ukraine orders families with children evacuate from Pokrovsk - The Hindu",
        description: null,
        url: "https://news.google.com/rss/articles/CBMiwgFBVV95cUxNWjQ1Ql81Y2VONFhOSU9lZ2kzWmZKNlptUGtaYmlDUEdETXhxWVBiUmd2Q0NSdWRNNTBGckJ3QUVJay1DbEJFR1FEazkxSDRna18wTTBuWjJoZEtCVi15bVh4c0ZZekxGdDBJM3M5MF9PQjlPQnoyN0JZblFnQTl5Z3NNVXFzbXgyaEhDdFhJaWY2UUJuT045ODA0emUzaWxtZWlBdnV2eWhyQnlCQTN6NEVhby1XbkoxNE5XSGJRemx0QdIByAFBVV95cUxOb0FmbTRtR2dIdXBXMTNiLWtZVXR1N09JWE1WWlFBWE5Wa0wtZWUtRFl3QXF3c2xDa2RqVFNfSWNhekxWMTlSVzd6dGRuUERoaTlQYmw2bWJaX1ZlVWJoRDkwalNZVjBpUENveWpKRUhDOHlJNHNoM0l6WnZfbWljaE9XVlVDcDAtSUNwVjJOclNIY3ZCVkRKQzJHcHU2eE42NnNQZW1wa3VfM2JleGRBd3p0dVpEU053ZEcyaFJLaVk1b25jb1A1eg?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T10:57:00Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Hindustan Times",
        title:
          "Kohli's old take on Rohit Sharma 'forgetting things' gets new twist with 'shrewd tactician' remark from ex-IND coach - Hindustan Times",
        description: null,
        url: "https://news.google.com/rss/articles/CBMiiAJBVV95cUxQYXd2Wlp3azVNNXpreEFTaU5DcVdXdWF5bENMVHROOEgyOV9yT0J6b2ZRR1BtU1BCdjRoTUpLWlRXMzNYMHp3NjVjZnR2allPSFZHSm1pRFA1bkpJMk1QTF9rY0tGRjRfQmlNZlBCQ3VkR2pxdThHTWtJaC1aTGFQTG41VTI0ZzQ3R09yTFU5bmp3SEp5Uk9MN2VXcWNtMXY5UmZ4T1Zqc3hpaUNXelFMWVF0R0hFZW1IS0Z5M1BWRFdVemFDdk0zSkRIVlE1am5lRnFFbUZSN1o1NmwwYkc5WEc1NmlHcGkzVGxGTDdLNzM3dzJra3NTS3UweFJWT19zTTY0dmc4aUTSAY4CQVVfeXFMUFg1M1lVbkd3bFlKbDAwR3R6bGFvbWxJeVg3aE9NckQ0UDg1YkxJSVlxdk5JTmZmMDhFc2QxMHM0Mnl1a2RNM1N2LUdMTGE5Tjdyd0Jqb2pQM3ppWjAtOFVhUkZVaFFDSFZmZVJFTUNGd2NTQzZJUVEtdzVqRF9ZM3lUdlRjOHVWWnFHUUxpd3pPLXZiZ2Y4YnF0Ulk3QkRUMUdsYWd1bm1XNGdRcXB0ZjlaQlY4bHJjRUk4YzgzTl9HdVZwNkIyWTI2VW5Nano0MExwY0tDMXMyZEVnclFETFFkZG1OUm9nUnNMQ1JuVExtY0IzSFRtSEU5QUY0cU0xdWFtRjJkbXFzQ3psaThn?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T10:54:21Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Republic World",
        title:
          "Effective Surveillance, Urgent Vaccine Rollout Needed as Mpox Spreads Rapidly Across Africa - Republic World",
        description: null,
        url: "https://news.google.com/rss/articles/CBMiywFBVV95cUxPNWsyeHY1SEh5NVZSNjMxQXQxOENOTzhSQjliZkxnZkludVNqNm9JWjM0M25FZUpxYU5oTFRnVnQ3QXh5aGh2WGRkSFU1WWNFY2hiandsZEloUmNqTFNQNDFBWnBmd1FhbmlyUm9lX0tlTEtaVVNQNlJpRzczRzRzV1RxMGtGY3dXekx6SXFRNDI5ZHM5VjNQT2lwcUdOWVozWTdHcjhTdThYOWJORHBzWU1JOFRSX1E3UFJoQUxJTDZIZDhxdGJRU093aw?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T10:52:48Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "The Hindu",
        title:
          "Centre defends law against triple talaq, says it legitimised ‘abandonment’ of Muslim women - The Hindu",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi7gFBVV95cUxPSm9jcGlIMm5KLVJ1ZjZ1Tm9TQ1ZWNXRpT0c3c19SaFdVQTdrMjZ3a0NwWVJCdU9DX0FGeDdFQ0tJQmwzV1VRM3RZVWg5TDlMVkxTRjdXRTF5V3VDVHpSVUZyTkJmdWptTzdCdTNxa2Z0WS00anRpaWJWOHU1eWhpaG1MNU1xaVlobktObVk5SklPcHYwcE80U2xiUEprdnRIQnJZaFVOdExCcHI3aDNVbHZjLXBTRWhsMnRNQmEwZDRXMXhLdDVlb184Ml9rOE5la1l4ZG9hQTN6N1QxWlBsUjVhN0dTWGdSUC04Skxn0gH0AUFVX3lxTFBYNzZGQWlrSzNfZEVWZ1VFbTU1RVBDUjhhelJub21Iek9pTTV6cTdSandGRk90Ylh5c1BBaUs0RW00cFdUX3dXN3ZPMUd2QXJwdXRPRmgwdEZQNXdMREduTjVSYkJQOVEzZkE0SlBYTGhlcnRiRU1wZUZLRm8xcVhwMDczbEcyNnBDZU1uVlFUdUNxVHR5emZuMkN3QzlDS3NtSUp1YWRCVVRWeXJLWTJUM3E1YkxXbzJ5bkJOZE1jMVZWSjFNWkpDVWRjOGVaZC1yX2VrWUthV3B2VktPc0ZDRzFnYWk5b1hYdlJ6TWNtR25HT0M?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T10:33:00Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "News18",
        title:
          "‘It Never Happened’: Sudha Murty Faces Backlash Over Raksha Bandhan Story - News18",
        description: null,
        url: "https://news.google.com/rss/articles/CBMisgFBVV95cUxNV3RKQmVfY3RwUEVtTGFvYXd5cktIZUNtaXhrR0xxVURmVDR5a0FyRUxfMTNvTDBQVnE1T2Y0elVxNnJqVVVFUzZYVV9ySVY3cnR6VlFBSnF3SDhkME80M1g5YUVKcEw5a2NhOU9DT3VxajVIaFlWZUxHZ2Zxb25ZWlFzeE5yNU9yaW50Zk1zZkQyS3VsQ1hnXzU4aUprM2Q2ZFpNTkNYaVRjWnZvNmlnN0tn0gG3AUFVX3lxTE5xNnlYcy1UVmZiZUhlcGhlNEhDRlRjblFjbmZ3eVFoOVVtMVV3TS1CZmRNbGpoVXh3eHBZSGdNeGp1WW5NWkc2ejVYeWNIaVpXNnRTTVF2QXpmcUlPa2R1dDNPMFZpN2ZwMGtMVTBPZkRFRzVKMHdNSHN0WUtmQ2xxNzgzazdZNnliUWc4a3cxNmpqNG9ZYmd6UlVBSFNNSGs3MnNiWG1USTlNVEVMR0xvVmJnc3JhOA?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T10:32:46Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Arab News",
        title:
          "Hamas, Islamic Jihad claim responsibility for bomb blast in Tel Aviv - Arab News",
        description: null,
        url: "https://news.google.com/rss/articles/CBMiXkFVX3lxTE1FUDBteTBPUE9lM05TNEdPYS1zRk5Nb1dkeFZBNGJpNVR5bnB0akJLX1BrYmUtaENJa3RpMjhuSlJhck5FNmp1QW5meFMtYW9sVVVTRHBHd2NnQUhYZ0E?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T10:24:14Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Business Standard",
        title:
          "Vivo V40 with Zeiss camera goes on sale with introductory offers: Details - Business Standard",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi4AFBVV95cUxQX1A4dERleG5mSnBVTl9EZE1lX2ZRYXZpTlFHbkVJMDQ5Q01YMlJWNVowVVRNYnVaSy03c0tlUnRHM3Z5Z0NzSElnVVp3VHNHV3hEU2xpTENSQ3ktN2RYSzZFdUFWajZYOHRIbTAtX1VkaXdaWTdqenhxM2k3a3ZuZFplT2lOdGFHNDhSNDh3MDlORW9tSEdqUFVMMnQxV0ZfUXFlY0JsMDd5c2pBRWRkSXdPcjhtNUxlM2JrdEt3MWY0NHlYR1pvMDBWTG1jNzNpMThnN0s1aEI0YjY0ckxactIB5gFBVV95cUxQZktyanJsRDlfelBfV0I5ckFpTW55a253WlJPWG8xb1dsdXdTWjdZM2NmUGdPaUZXQmJZVnJwUGJoMFRVcXdDYVhmVnZrVFVYQ3Nvdmltb3czb1JvdmpIdlVCOTF1czRrREtPVFVyVjlMOHV1YVo0am5aWHBUZlZhSko0OV80cmpQSlZPVGYxbGg3alNsNzJZd3JxM0NIUFZrdHJfMDR2eVByZVhmdzFrcmNKMkxLMGVZc1R6eXUtOEw0VkN4bU12bmlyeXdQZV9Wb2dDaHVxZDhwX1hQYnRISWdGcUdGQQ?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T08:50:25Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "The Economic Times",
        title:
          "Bank FD interest rates touch 9.5%; now 47% of FDs held by senior citizens, why it is time to change taxation of fixed deposits - Deposit growth - The Economic Times",
        description: null,
        url: "https://news.google.com/rss/articles/CBMiqwJBVV95cUxQZEFSek5FbjVFLWNBYUtaSWZ4V3c3RXlBN1hxa2pnNzhRNi1KcHJ0ekdsWE9ORTJHYUxEOU9BTjQyRUc0ekwtNzNoTWwxb2dRYXhfRDYzZWJFMk5WYkpFaW5TbXdER3Z4M1B3UkFid2RvazZXcU96NWZaS0VsTGFsRC1LelRMSzNEMzIwcFlzczdSbUUtQW92eW1fNUVMVmloVVhGZktZSU9pYzVWdDVqamotVnRHd3JJb2NxN1c0Sno5ZkdVUHhTUHdydmJneFFSMXRlLWdLR1QyNEFmV2x4WExGNTdkU3N4QmdsT2prVkE2THRZdWpMUDg0UHBjeFRTTUFwMjlYSmxfSUVYQ0ZaOGNFd2U5LU9VREFkLWh3enRYWDQ2a0NHMnM2dw?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T06:55:31Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Jagran English",
        title:
          "Garena Free Fire MAX Redeem Codes Today, August 19: Win Free Diamonds, Outfits And More - Jagran English",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi-gFBVV95cUxPeGp6TmI3c1JTSHhRTjBlakZxODVUaFdoQzlDMEhTOEtEWjkwWlNkbXdodGNtSHBNODUyb0lVWUM4UjlEX2hma2d1bzFNVkRGekZQMFRPZzBIbkFZLUVoZmVoYWJ2RzhNNlEwX0c4eEV5TFNYcFFmVGcwVkpVUUQ5NFJiU0MyNlcydTdPQlJPal9jM1VDQThkWjROOEFXcC1KVmd5MXBmRUtiNWZSaDNLWDh0U0p3Wk5ZUWJBNlRhVExRNmp0NW50d2NmOWlyYlFYZWp3VFV0a0k1WHNueURrWnpWc19VNndBZWNyRUdNSFdaOVI0M21rbkp30gGAAkFVX3lxTE5KMUpzZzFrZXVpQjduVG9KMmhWUlE2LXBjUTludnNfRlZvR25Tc1dHYkNCeDNmQVFlek9wWVZLdDRNWHdYeXZwaVpYNmM3enc5TEt0UGZLSFBqZnYxMDZ6QU4tRFRWc09qTURYbkl2c1lsMnd2VmxNZW4zREVlQ2JYR1JPSFJyeUVsODdBWUQ1WENZYnR2UGlJaGZLUDNJR2xfTjlLUWhEODBEZFpzUFF2V3RBVXA3V1l6LUN3OWc3S3BmSkpvRk1waEViYS1EU3BIejhJMFhOeDQ5YnlvS2ltUGhPdm1Vd0tJWldwdFEzbENnTlhjMU85YjVjYXhMc2o?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T05:05:00Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Benzinga India",
        title:
          "Maruti Suzuki Share Price Muted Amid Tax Impact Due To Budget 2024 Rule Changes - Benzinga India",
        description: null,
        url: "https://news.google.com/rss/articles/CBMivAFBVV95cUxOdnhYLVBQV29scFVlSFdvOWYxZXhXOGlTQTUzeUxFclNUR09tRk1ubHdfUUtQMlJLZXdoRUNEX1FOMzJNR2ozbks4dGZ1dmVBMmFJT3YySUEtRkhhT3VOUlFfc0pKTmNMRG1STi12THZKTnNuLXNrMkJtSld1MFJUNUNVNzF0VXNxeFlGOWdOM0JWcUtwYXlxQUJ4dFhSLVo5OEZsM2lQLW14cFNtZThhQVJ1UzNzTU1ncmd3UQ?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T04:21:17Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "WION",
        title:
          "Gaza war | Ongoing ceasefire negotiations maybe `last chance` to...: Blinken - WION",
        description: null,
        url: "https://news.google.com/rss/articles/CBMiugFBVV95cUxQUXI5ZWgxVXc3T3ppUUJuTlpvZExkSVlYaEFPbXg1enphY2RNX1RSUWxKVlNmSlRjbnpObk0yUlJtVHdrSTdSdDV5UXA0OXFXRFc2eWdEYllvY2pUZmRCWGlJOUstWGY5VzVESXVsOXRsOHh5emxocEZfalIzRjBtVjhiNHdqNkFOZExDaGk0a0Y5VkJoVy0taGNMNkc0VFdBdlkzbkVha3J6MlJXYVprYm1lSnFpRHRUaHfSAb8BQVVfeXFMTWE3S2VnZGJEYm9vZ0gweG1OYmVvR1poa2NNRjBXODh0SXJpQVNpSXFLR1o5RHVzOFR5alNMYTlibWtPRUFQY01sYzVNQ09sSmtxTURBNVh3VnBGS010eEZxbk85Q2JJU25QdGltRXBPTTlDaU9jaE1GOGhmcXptTTJyUnRUNEhsSmdjZ1BydE94OFBZa0xPcDJZVEtvVDkxcms3ajlyZGlIZXZWSkFaM2U2djRSVVBkRzFsUC1PbTQ?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T02:16:41Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "MSN",
        title:
          "NASA images: 6 photos by Hubble telescope catch glimpses of outer Space, from Omega Centauri to Dumbbell Nebula - MSN",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi-wFBVV95cUxPV0VVUGpNVWFwckV4ci0tWTR2clVaTDlaWmxuaTVvUEdqajV5QUVSdVNHTGVIblBtanBGWFVOSFZVUTJlNWI3a2NQU1V6YThGeEEwajkzVUZZMnJLNTZnNHZpQThlNHBZLTFUR1plTUNnR3RIMFlsNVZUekdEWWdUUDFBbFoyUm1mdmdhU3BGeUd5b2ttaEJoelBzUVR5VVMwQ2NCcTNvdElzOWFsa2J1M0hZZENqSXYxWWFCS2V4WDhlT0QyRnRoRG5UWWVZTjd4ak4zY0E3ZFMwbWwxX25fTndjQXY3WEp2d3VqcFl0bHRTLTR3bFl6dzFPZw?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-18T14:33:19Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Moneycontrol",
        title:
          "MC Exclusive: Pine Labs wins initial NCLT approval for merging Indian and Singapore entities, move base to... - Moneycontrol",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi2AFBVV95cUxNM3NuRGVTbFVWZ0JPdXBBRlNzTUlmb2pRSFhHWV82YlpPVmFVaFNWT3hQaHBVMl9wVnlSTTlhOWdrUlRYcmJKTk94cXdGT3JFMXJJek9ZX2l1WmI4Q1JxR2xVZldvQVU5M1h2YVNsRzd5WV8zUndDWE1MS0lEbmVNYWd5VFZDVkV3VXpWQ2Z5UVpnS2h2YVdVWWRkUG4tZWg5OG1ZSGhQQzFMWTZ4ZTh4SG8yY0RvYkhlUE1scFB2bXNPRG1Wd2NRUDhjX0tPck5zREN4OEdLcTHSAd4BQVVfeXFMTWhxZldxdGotVWFMSktqVG1UeE8yRmdTNGtVWl9pUktSTFpjUk9hQWl1YUo4d1BadDFSWnp1RU91VE5JTkVQcWVZclpQeFBpbVRJejhXSFZjX1Bhckh2WGRBTy1QaXpYckp4dmdlLVpCdlJEN3Y0QUphSERSZzZUYm9ESDZaVTJNeWFoaTc5V0xQb3A3TFRXOXhid1h5NVBnZ2M2Q0NRbi0ydERsMzdScGQ5VFBGcUgzYzUyaFp2dnBVLUtYRmlYUzJvNUJNekY2YURiMHlyRE9QWnJxY1N3?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T16:09:51Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "informalnewz",
        title:
          "Senior Citizen FD Rate: Fixed deposit interest rates offered to senior citizens by SBI, PNB, HDFC Bank and ... - informalnewz",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi5gFBVV95cUxPTjRJRUxpeENmUGRka0dmcjk5d0RNTlR6MnRTNFRUb0dneVhhcmJjNkxKc2t3Y3BkWDhFOWh2N3YwbmVqcVBiOU55cVQ3Q1paUk1nTUFIRFdPbGhleFBEMkw1WjRaTlJFMVZpcUdRejhVazhLM1A4cVg1SnFjMHpDRlJONE5lOVNfN1FhUVBCOVdkWldzcTVPVFJhakJJSG5nNTdJRTRQNDZJM1AzTXBQQzF4OW5YOC15bkJERDJPc0txVlNiMDgyRFJYemFocGRYX2luMjQ2al9WR0c1cU9KUFlqTzVJd9IB5gFBVV95cUxPTjRJRUxpeENmUGRka0dmcjk5d0RNTlR6MnRTNFRUb0dneVhhcmJjNkxKc2t3Y3BkWDhFOWh2N3YwbmVqcVBiOU55cVQ3Q1paUk1nTUFIRFdPbGhleFBEMkw1WjRaTlJFMVZpcUdRejhVazhLM1A4cVg1SnFjMHpDRlJONE5lOVNfN1FhUVBCOVdkWldzcTVPVFJhakJJSG5nNTdJRTRQNDZJM1AzTXBQQzF4OW5YOC15bkJERDJPc0txVlNiMDgyRFJYemFocGRYX2luMjQ2al9WR0c1cU9KUFlqTzVJdw?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T16:04:46Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Business Standard",
        title:
          "FM asks RRBs to devise suitable products aligning with MSME clusters - Business Standard",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi0AFBVV95cUxOZ29pS3U1TEloMWgtM2N1OW1ZYV9iZDB6c2RtS1dIRGtrMHNtSlpWWnV6ZndJaVJIaTNiaFpXR0NDSHFWeEtqYjNBcjYwVEZJVmFjcnluSUdCNzVKZDZMbGlaOTZQWWphUk1fNlFSanFjSlhTblRiNzJ2YjJpS0Q0VVdzX19Iem4wREFfdmZvWmVfaXA3bzFVaGFhZ3pxQzljM3B3eXUwbHY0SEJoVkJTYVgxNlZqTmxHYWR6Uzc3dk54cFFIcmZWejlEclpGWlpV0gHWAUFVX3lxTE14aE82dlBkUm5rUk82NTFwZm5XNUpLVHp0RFVONkpiTVpSWXRTcThTMnN2WjRITmQxX1R4NE4teXA1c3ZEeDE2Wlo4MDd0R2VQTG04VlNuSFhNbTlqYlhjMzZCTXBzX1JXMjJERkV4c2NXbDlaVmx6dGdXRXJGcTdrN0oxSEd1dnRqVWpsaXkydTZhRGJzNF9wNHB4a2QxN2NwRnJJQjA1TTlYdWVEUmZhOUd6WTYxWFZQeTFEanY0bHFLZmxZU2pfUDY1MEVmTndrWmVqMkE?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T15:25:52Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "NDTV Profit",
        title:
          "Tata Motors Sets Sept. 1 As Record Date For Share Capital Reduction - NDTV Profit",
        description: null,
        url: "https://news.google.com/rss/articles/CBMipAFBVV95cUxOWERLaGdsSFRQYVNwNEY1N1J3M3JqeHVQbmRtUkk3eUJWQzVuUERJM3hkM0VlWWZBSTRQSjhkc3QtaldvSC1UbWd1TDVpcm5KeGVGclVtRU1YQVVjTmpQbkYtU1FoOV9sS0VwU3FMRDRsaHk1LVE0RWF6YlpVWjJ3NzgzTVFYWWhXNjNPbmREVUhHSHlhOEczU1ptQzZueWhNVmw3YdIBqgFBVV95cUxNVFl0eEVab3Z1LVpZOGI2WGVQdjUwTDd2MGktSVVTa2lxMHVJMXZ2RkF0ZDVQWW9fQnA3dEx1V1VlekhqZXBPcUNiSk0zWWExZ1FWT09PNEJob1pRWTl6eXBVM28zUTZHckY1MzY2dTNkS19VSFBkaUhjRjByLUY4ckhiNjVuUDBYQmxURmFDTURmaEpTOHY3LVpkdHhFbDhhMnNGdTZpNFBXQQ?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T15:20:44Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Moneycontrol",
        title:
          "RBI paper calls for cautious monetary approach as food inflation bites - Moneycontrol",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi4gFBVV95cUxPSG0zeE4tTTluRWlqOHJDTVJDMjJvU0tQcEdGazU5VENxWDR6QUNtT0FTLVhRNTV6Q3J1SmstM2NBZnMweTZPVjE3eXJITnl6Ynd3ZTYyc2I5bE9QbTdVTVJQZFdCY3RNV1k2NHAyWk51QV94NWU2ZHY2U0lKTzhyVmF0ZlZsaTA5UFdQNWw1T3JTMzI2UTI3bzdIVHV6OUxmWHczNVBaQlczdzRlcHBuVlJJSS1zeFRxaTJOVGJpdXFMZVhnd25KZG5KM05lU2Y4NV9ZYy1DTjBxTGgwMmtzd1pR?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T14:49:58Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Moneycontrol",
        title:
          "Fintech firm Slice gets NCLT nod to merge with North East Small Finance Bank - Moneycontrol",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi2AFBVV95cUxQN2ZLQWdHSEl4SVRMemxwMmlJeF94Qm5waUxEdnM2TmFORnoxcDl5c251TEJDQkVFdzdscnAtdkV4S25vdkJ6eHdLZm94OHo0cGx0Y2l4Mk1xOEFJaUZiMkhKNWJ6Z3ZNdTBYdDU1aTFpSXo1QUo1djU0MVFYUFljMkhVRmRqZURMcVNzbGlZaGVNandtN2d0WWVscGZsaGRxSWcwUEpBLTVvVFFOMzV3YW5saXBSLTNuMUJzNnBsNjBWc0ZxcEV2SExKZE1oSE5LQXhBY0I0akc?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T13:50:38Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Business Standard",
        title:
          "Brand matters: Anil Ambani's firm moves NCLT against IIHL using 'Reliance' - Business Standard",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi1wFBVV95cUxPS3RsWEFWNlZNR29LbFlzS2NiV1ZkbmRPLWVlaFd3UVhCZERJa0k0LXRIUDM0alY3WmpwNVMyX1dCRElZZzBhNldkVk1tSXctNjBtcmQ5S0w3R2xiV0hFV0hLSHhDSE9HNnJjSkpLbGVyNXlFUHNlU1ZKXy0zam1PcXlRbE1aQktnTW85Y21NcnMtd3NGN3o2UEFoVkVkMEFtM2w5UzRXNndrUUVGYWx1b1h0dTJwUjFlcjczZU9LY0tfQkZ3VFA0OVY2QUFtc19hVmZ0b0daRdIB3AFBVV95cUxQV1hHU2FydDZYRndRNl9IMzJnaUp1c3ZRNkhaaXh0ckwtS2tDMkxzdU5rN3VOYko0RXJ0QjNkV3A3OU4zcWRBajZybnRXN3dnSHF2TlNmaUI3ajItME92SEFVTGNHa3NkNV9LcGJkYTZlTE9tQUpiUkNNd1cza3hoWTJpWVV6cEIzNEx2ak9ybTVfbWtBdU0tSE9va24zMXJwMG1QMTA3YmtRSmVITFZMd3ctQ3lfMDliZEx0SG9yOUNQVmMwWVgzLTdzZDhPX2VPNEFxc1Nyb0dXdUg5?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T13:44:53Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Moneycontrol",
        title:
          "FIIs net sell shares worth Rs 2,667 crore, DIIs net buy shares worth Rs 1,803 crore - Moneycontrol",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi3gFBVV95cUxOajFLT1daQzNNd0dLRUZGM0JTaGVtSnhBb3IyT3JSQlcyMTM5dkI3NnZHd1hZMHZVeUdQbTl6OHRaeGlHbEpZVnlXS0lST0FpcDd0dUp5YndvNEs2SmJvR01QUHA5QU83WnRQUXpxY05hUGIzYmRQeVhyTUZJWUdtVXlrdWJBamM5UTRnV3NUamdGNWlUa0d5Y3l6a0ZxdkhJMVNaOW9KMVBOZmdDSk1LNDRCYURTUi1mb1dZZnZDRzktU2tRcVFPZmlaLXEzQzMwQy1KZ2ZjYkJMczE2NWfSAeMBQVVfeXFMTmQ1NHlNSXRpRnM5QUxlMl95anVmUjJtbjFRZTl4UFNYWDZaSm01Nm56ZmMzdm53TC1QWHRlTzlBVk1hVEg3VV9xWEZJY2hiX3RxNXdVcGVfckExRjVjN2x1emVyXzllaEk3SUNyOFRFSFZJZDVjYkVNczEwRVJMUUR3cFBrdk4tcHdDRG5scllyYVptaXN4bGRubHVMaEJRWFZWZWhVUnBYNFM0WS12aEwtUTR3NGpuQTA5TU15UW5BbDZzV3ZBbVdDX29kV3FpbHdYN0JRMWxyZkV3Y25RMUtQYWc?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T13:18:28Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Moneycontrol",
        title:
          "Adani Group touts cash pile to ease Hindenburg-fueled concerns - Moneycontrol",
        description: null,
        url: "https://news.google.com/rss/articles/CBMiyAFBVV95cUxNOWFNQTFUQjBBbHNRWlJUZ0FrVnpBNS1Sb3FELS0zRGJNcDF6bzhmblUtaEtnSm9yc3hlbGdHOXZhTEdjRWdLeVNxYXpWQVJzVWp3eVdBSTBDQkNFVHUzaXRsbTNBNERnVzIxNFBBemx0VVdJQVhqdUMzR2VrV1RBSV9EMm9OZUI0RVRzWDZFamlVOUUzZlZpVzdQRUFMS2doRHF5TFFKQXA0VFc0T05FYkptMlJyM3hURjBwUWcweWtlM3Y1Yi1LQQ?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T08:21:22Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "India Today",
        title:
          "'Adopted nahi, acquired': Zomato, Blinkit's Raksha Bandhan banter is hilarious - India Today",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi1gFBVV95cUxPdzNjVFYwR1U2RF90X2l0REc4dTV4Y1VJTG9BWDhJREc3RWxDNDNLLTc0LWJubTk2Sm5MV2pobDRuMlltMWR2ZzNUVEF1NFVUT3lSYkFPQnBmZ1lDN0oxUnJKTWpLYmlnSUlMTGh0c1BPNDNpVHZTZ2RsS0hOXzJiME93bUo5Y3JueTZ2LV9fVVR5aDN5VHEtaWVkc2FwbHJvXzFaZTE2dl96NFFrSGoyb19uc3VrR0laMjJaRENNbWJwRC13UDVmbXRNOTducmZTUlBGak930gHbAUFVX3lxTE9oZW1PNDg5YUlLZzZqZUNUQXhBOUhEWWxzMWtVaURQVmJBMnVpY1N4QUR4RURnZGFHV2p4RmRFNEMwR1ZNZ25MNHZnOHVWdmFSYUNNMHFkanJmVVZyak9qT3RzLXA1emFQeTViNHBxNXVQTDZTNG1GY2FkOE9OazNyUlozQmhjMkdnOFJSNUtrTWJFZU5VTkVYOGI2dC1tRzVTLXd0Ui0xRWJJU3I4bDJwZGtGWmVscUFjWlhlQ09iNzNEYU5aNVE0TGRRRUhVc09vVTZZbldwckdzUQ?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T08:03:16Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Mint",
        title:
          "Caplin Point stock spikes 15% as subsidiary clears Brazilian health regulator's inspection | Stock Market News - Mint",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi7wFBVV95cUxQTFcxQVNmem8wazUtLUhsbnFsQjF0cmx5S2o1VXJxUHg3b2NsWDlmVDdaRE5uZnZiYWZsTGZCMVp1U0FOZC0ybXVadGVhWnFYYWRhd2VYY1dHeHd4Q19TRGNEcjRFNHFXNnhRSXM4dHVDNjgxeE56RHZMVWpPRncxUlRycnNOalBmRnctdXZUNDBVbG82WFlhVnlDTTJtdk8tQVVhbUZaa1NvWU5qWk5ZNEVOcnZnaS0yT3RDSTNkei1LWWU3Nmx5d3FuMmYzY3pZZEl0WEFJWkhHdHpwR05yWFJHQ1hpMkhjWDhRbngzc9IB9AFBVV95cUxPdVpFS3NwaTFNUEt5Z1hLM0NUa1JJR3VNZDdhMDQtR1hxSjVsVl9pN21fdUtrRzcxZ0RFVHMyQTU0V01mNU13NWpfaXJLTUYwNlM0SEZQRXA1QzRvUTFxNXRJSi1KMWZLQi05SEdFSEtjeDNURUZqTnQwR3RvUFl6SGhVbXhnR24tT05ZcTBuUGJGUHlEZWt2RnZRS3NHeUc0Qm54ckFMeENTVDdUeXhsekNXTXphOVAzbXpKMWRPTTEyYlBuUTFldUZTYUdzaFRGaTVFV2VaYUpldW1MV05sRnhTVnNva3VnOWE5cjhyRUd1NGpJ?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T07:58:19Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Benzinga India",
        title:
          "Suzlon Shares Could Breach ₹100-₹110 Levels And More In Long Term, Says Technical Analyst - Benzinga India",
        description: null,
        url: "https://news.google.com/rss/articles/CBMixgFBVV95cUxPcm5EekhTZlh6V1ZQMnVHSVNubWFSLXZvT0VMemZ1LU94R3BPbElJZGs1TVJWd2FEYWpyOUZwLTFxNE03VDBndVF6RV8xdlVHMUltWVIyWHR0ck45M0FKU1B5WmhiRDYyMklKQkRCS3dFTkhYdi1ubmJ6aDh5cXlBb09qa1RPSlEyR2w5MUlHV3NRbWlHZ0dzMTlqMUNfcm83TnJjQVM5VHk2aGJFRUh6bExPbV9LQXJVd21CbmRmaWo1eDNjWEE?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T07:44:42Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Dalal Street Investment Journal",
        title:
          "2,000 Multibagger Returns in Just 3 Years: Defence Company Secures Patent for Advanced Mine Detection System! - Dalal Street Investment Journal",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi5AFBVV95cUxOUnQyM00wZGI3WU1uLXRoTUVBMHlwTlZ1cGdWVVQ0VUsyX1NGY3JDSFdUMGlLLUxZSFp4dFpkTTB4RTlyXy1EbWlOdUVEM1k3RU5GcFVsTHlmMFV1YV9pVmh4dkQyOFlhUldGSGFJRU1wVTJTLVRvRmU0Sk82RzNURDBxNHdUbjBPQTR2Qmd2eElTbnk1ZTd4OTNiWVhVUHkwZ2JxMnFrZzRrNHdRaDFrN0RTNG9LUEF0NkdMaWN6N1hQaDdCSzNKMkR6U3hOYUd3UmlwNmNCNXFyaWpCOVNzSmdaTXk?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T07:43:20Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "The Economic Times",
        title:
          "Paytm could achieve profitability by 2027, upside lies in getting acquired by a bank or a corporate house: - The Economic Times",
        description: null,
        url: "https://news.google.com/rss/articles/CBMilwJBVV95cUxOUXJzbERWenVZa1RtaUNMUVZNVlZkcnB5aEt5dUdkSGowWkg4QWplbVM5ZHZjZHJqenVhdFNxWGUxR1pmVHRfaXdDeWpPWTlWWWhYei1NRVdaeXZ6NENVOGlMSXJGcXpYaGk1U2pOamV4WDBOUjRkR25zaVZlODNMZVdlM1lfc0kxajhIRDJHNkF5dzU1RjZZRzN4aTE4ZXk3TDFiSzdLS09VTEhZRVViQzJsbVZXNGw5SnRJeFBVMDdub21tMW9iTEE0dHRmbzRQalM5RjByTGJEeVRrNWxUbmgyMDJyVDJNOHlhM2JoZVh3Um9FZHF6dzFNMEpIM0MwclZDYUwtWUdKSHBKekVoSTk0RjZ2S0XSAZwCQVVfeXFMUDY0dG15RWoyYU5wbVhfLVlOTVh6Ym56X2N4TktHTnlWelYwTUdHaHNoSDUtWlpkcVZpcGpRSnYwOXRaQUNCY0FmYmhaRU0wMXFBMzdEbzVEb1NxU2w3amM3RUlzRTd4bjhHQWJoenBsdE5hRlJuNjRBWUduOFg2dmVBMlpBdURlVHBGU1ppNjdYNWtQUmc5Snd4YVlOZHRmSVVUS2sweFNRTDIwU1d2Z3pkR3JGb1B6TThYWWJzSkpHWW1UemJMYjBZeUlpM1p1aC1kLURKa1NiVWNITHJ1XzFBTkpnSWR2R2ZhRlMzMnRMM0Etcl82dVFEeEVNeERaejl2eEZxRmJ3bkttZmdxN1VtY0dTZ2hoVGR6N0I?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T07:43:01Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Business Standard",
        title:
          "Ola Electric share price rise: Madness beyond fundamentals, say analysts - Business Standard",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi0wFBVV95cUxPVDlBQ3lDYVhJenNRcUp3VEQ0M0wxM1NCUU5tNHNweEdvX0FIZW5hZUd4cXBWR0YzM3cybTFVRUJIeEw4WFNhdFg1Mi1BcVpnYTBGVzFYNnhPd0VaSHRkaEh2cFJlOHVfOTBpS2NnVllSY1ZxaS1Bc2E1dHJrM2EyOVVZd3Fib1ZDbjRmZGVqWWdYdTUxUm9mLTRUY0V6UzlGMTdXMm1VYlpLMXFSbHpOYWRUd052U0RVMkxIbGpHc2xXYnQzWUtZMTN0SXN5VHprV2ZF0gHYAUFVX3lxTE9xQm1CVWExODVQOFpSdmlrZzNEV0xQMTdoVE5iem8xWnZhWlBWZkFmVE9qbHkxS25PclZJWVNSQ0ttcHUwV0x3OFdWQkhrczJBZURqUUhyMEF6RUtPS0N0NXNnQmY0T0tnVFUxNk1Wb1IyeC1rVVA4dVhkdXluQ184bVd0UzhGaDIxZWY0amkxNWNRUk5XWkJIMzNObEFmQnVEdlNnMmdMaTdCWHZqNk1Fc181aTItbGotRHlEaU9aZ1RoT2NtcVUyVmw0Uk9ma2taQlc5OXZYZg?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T07:34:53Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Moneycontrol",
        title:
          "Peer lending blow: Some P2P platforms freeze new transactions, industry to meet RBI this week to seek... - Moneycontrol",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi_gFBVV95cUxQUUxEOW5EWk1Ed1pTVHctQnAyM2p3czlERWhUUjB0MF9TeGpISlhXcF81Mi1maUlJaS05RFZEU2g2Qll5d3lwS2V3cUVUemo3OUo0Vm1JMkpPRU16SGhCMHhrWVpFZDhqNmFzNm1SMnRIbVRLTm5Cb2Y1MmtWdW1MWmNCb2xiMG5ieXQ0dWRqMkdlc1E0TE9BSzZkWkJ5UEo1U0dmNTVDTjFrN2dYSDh1WTdUZGliT3ZuNW5BMjRWbHRqY3JzOWJoSUhaZVBvczB4RUZhaVlIbElScG5VdXRxV01UcWVvb3lqT2dNdnhuZVM3cFhwcFp2Qm93M01jd9IBgwJBVV95cUxNOTNacUQyZUwzNUNBWE9MX1JnYV80WmEyMVY1RVlhMmlXLWJVSlBsS2lZdko0M2xxNnJMcXpPbGRaMC16X1BnamxiZWQ2eUhYS1JyX1VyZWFBQ1NYaUJrcUd1c2VFR3NhajlVb05ybHBoaGZ4dkFTVW5NTFhDR2k4THc3TUd0LWRtMk16anoyTkg0Mms1UGU1V1MzWDB6b1RTOUlwUXhCOTlXVzM5b2ZnLXh4b01CYXR5MVRkTmtiZE91OXV4MVduVXpLOUd4ZlJzLTBsU2QyY2RUY2xOS2R6M1YzZER3ZTJNMjl5dW5nbFZkY1VtZ3UwekJvTFZVZXYwTmR3?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T07:32:04Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Moneycontrol",
        title:
          "FMCG players expect volume trends to sustain amid rising demand in rural markets - Moneycontrol",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi0wFBVV95cUxPSFYyYXpLS2xRaWpGRkNadG9wSmNkUXJGNV9qZTllYTJJNWFDQ0JGcFM4WktpdDM4Q1pMalJjUHJRbmZFOHB4cktxN0VJc3JhV1MwNm5ibWZJUGRFc0R6MktiRWlmT0ZzMkl4OFVfQWplOEVia1IyLWVIdDA5MWdPV0ZtWUVkYXBTNHFNZW5IaXlxWndhWW5kUHFobVMtMDBNY3NwTXpjRENFRGE5SWNRSXRYbldwN0dub3NtZU9EcnZBMlBqVmhfZDFCTzZncXV2R00w0gHYAUFVX3lxTFA4MkJ0Y0lzRGNHRDM0VThEVnJiMldieElJN2R2bXhzdG5mQVdUMU1iYVZmckpNVUg3UVJCQ3pJOHUydWlGd21DMWpacEktSlNQeVA5WnJXMk4xazNHdFFHM3U5cTJnWS02Z3p5MmJCSnRsemtSOEg5Y2hQdkFTZF9qUkpKeDZGc2F1RlhrQVZCSU1qUE4wTDkwcnp4VDFKVmtMcWJrMmpjWDBkczhJb1ZwdFZHbVVmV3dncDlHamFZRktzQkszRkhfd1ZWRFd1NW1hQnhKc29EMA?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-18T09:06:05Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "CarDekho",
        title:
          "Tata Curvv EV vs MG ZS EV : Specifications Comparison - CarDekho",
        description: null,
        url: "https://news.google.com/rss/articles/CBMiowFBVV95cUxQVkZQdTFWRk9pX3Z0RmVWUUxFaTRfQXJOVWhmNTNrUjI3QS1WMTJ1VWJDNHZBS1ljdHBLX0lCUExnblpIcFdjZ19sRmczS3lLN3Noelc0UXU1VDZqcWF3SFhKQ19tcEl5Y081MndSa0ctdEhXbjdfVzBwWGF6VGhUZjJzTW9JQTVXRS1JYjVGd29ON0trTkwyeFRqN1QwSVY2SWJJ0gGrAUFVX3lxTE1WUlRCYXJTNndEZlMwN1F4X3pQdnpIUGwtMmhrT3ZTRnpraUJPTnFFVjNuUFhpQWQzbHdnbUwtSzZsSGpyYTByejlWZUhFTkRWX1drU3FIazg1MWYtZGd6Q0tuYjFEeGhmM183OGcwOVM5QW1VRVh5Zi1peDROOGluQUhUTDhhVmxLeFRySXdFMmVCWXQ3NVhRT1p5bmZrLVQwTFlYM29UdGJyNA?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-18T06:20:00Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Moneycontrol",
        title:
          "Seven of top 10 valued firms add Rs 1.40 lakh cr to market valuation;TCS, Infosys lead gainers - Moneycontrol",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi7gFBVV95cUxNWmxPX19na3EtYWhaSVdJTHBGbUNvdkxXRnJfN2FDWmdXS1MzNXJ6Wnl0MTJ0YnhjTDlkSmhTR1lHZkZEai0tS0t0TEF6WXhKejdUOGlNVmZoY3ZraHNlT1B5V2JYWXlTT202blNmWHNPMWJZZDEyOEcxM1A4NVVBbURVWDdYcFgyUmlPMXUybHhZa0x4a1FocTBvY0lfRmxWbzYtWmI3c05uREZVMnFZZ0pwZy1MM2dPUGxraWMyazMwVmJld2kzRDY3X3J2aFlJVjQzVFdRbzItLU9EMHZsTlk4NXZjUF9yQVFZa2p30gHzAUFVX3lxTE1xMmxJRFYydjNtVXZPOHRsaE81UHlmS2pMZFJHLUxyQmxyRDVPa0JBNzVUM2o0TkNyZlE0M211OW1kdmtyWWZWbFlibm4tLUlQSzN1Y0I3UVpwamZ2UU9oMnNuRXpPaVdPeWZLS3ZFWG1BYUhvMDRPaUNDSFJqMHZPbXE1SDNyU1JHM3lTVHUwakk0ZzdncEhiT2YyWEtMQ3M4cHRlTUZnWEVpbU9pU1A2QXcxRXYxMHU0NUoyXzIyUEg0R0gtU1BWSWlWT3JsZEZCN1I1LXo2X3duUUl5bVBqTEtHTEszR1BlRl9HMndWVjFLSQ?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-18T05:16:36Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "News18",
        title:
          "Gold Rate Rises In India: Check 22 Carat Price In Your City On August 18 - News18",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi1wFBVV95cUxQRl8zdW52cUotRnI5Ymhock9fX2loU05wREtSSnBiM1V3Y2lCYkloeTZqUEc3SVpSTWhxZDkyaXJIaUJjY0VLbUhGWU1GSFprTzJSMDhFOXlIc3RCSXdkMVBPSW1GeFJPN3NrdU9XV0d2bEZoZVlpU1FlX09Oc19mdzBVV0xsU29IU0lTclE0M0hPa2ZVWnVNYmZTZ0wzcG9OM192MUxJRmg1WHBuMkR3aGxueEpHRzhFVkgtTmJCbUktaDgzbHlwZzZCcUwwYlkyYjRNdndZVdIB3AFBVV95cUxNTVFZc3lxaFJNVFlRVGVhTGE2Wllta011Wm9CM0RHR1JmV1pqQTliNjFQbmlnemUwd1VJd2Q2cE9NSm9pMGEwRmlaQjBUWVVsbzExZU02LTRwN2ZBcTdvRTQ2ZXpxYldFNmV6bUh5SXcwVFRObUdqNDJUb0FEQ1luUGQyZHgxNmttbUhRNWRwb3p2VHdQSy1qVi05ZS1tbUlNWHVHaFFCQnNraEJOaDFuOGxaTmxSa0tvcXdCQjI4ZkpXcWNsT3dicTRGUVhYOTZ2SVU2X3lFUmdYeExD?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-18T04:00:13Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "The Economic Times",
        title:
          "Jackson Hole, FII action, IPOs and 6 more factors to impact D-Street movement this week - The Economic Times",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi8AFBVV95cUxPSkJySjRWeVdLSm5lY2ZnMmloSTA0VkJjUllYcDVLa3ItNTVJYWZkMUpyLUZyZ0RaOHZyVVpZYmZveVdxZW9IV1QzTnIyTXE1Zk40bmpEVjluc3ZEQzhSVEF5YjQyeHFZVFFWTnVVZlRFTEpsNjJyblVrMnU3V2pCVGJCNHVZUGhoaEVYZHBSUWZiUGY0T2JkNGZQUFpNSlZWVWRnMjE5MWZ0STlQRGlzQ1hublgwLTNRbElzdGhvWjk0ZE4wT0JPRzV3c185Y05zdGk4MDVMQ3pGLVV0MmJ5Wk9uQ182NzRXUHJacjlpSGQ?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-18T03:40:15Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Fortune",
        title:
          "Wall Street sees gold nearing $3,000 after soaring more than 20% this year - Fortune",
        description: null,
        url: "https://news.google.com/rss/articles/CBMitgFBVV95cUxPcmhyQUlsMzc3Z2hqWTcxUXlTc2EydThVbEg0WDhJWW1HZzEtbThHZC1zeWxGcWliTWZqTzRUQjNXaXVWcmRmd1p0aDBoc3NNYkc2RWoxQmF0Ti1uT2pHZk1BOHY1a2ZWX01WSU4tUms5QVBnbGVWZFdpX2RQUUM0TFlGaEstUTV1b1V0VWhBNDgyekRwc3lFRDlrWmoxVGVJeTZkSFI1Y3diV2RuVjRwQmd6eXZfUQ?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-17T21:38:00Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Mint",
        title:
          "Dividend stocks: Reliance Industries, Man Infraconstruction among 4 stocks to trade ex-dividend on August 19 | Stock Market News - Mint",
        description: null,
        url: "https://news.google.com/rss/articles/CBMihwJBVV95cUxPOTU2VmFfN1d5dnc1RmRoMmF5UGNEeHhRWTlRQmdfRVl1OU03NUVZV3JMcnJSV0FPYTBUVHY3R3U3YlgyelI0NFlkb19DOEpPVGMxTXNHeGc5MThMYVNlYW0xamc3Tlh3eHl1TmZySW1xbVRNX3FEVURqUVAxWm5vR1Q4T3dPcS04cUZZMFZlVmQ4bEg5dHdhdVBueXZ1UURscWhqTkU4cGt3TjhIcmhLMWkwSlA2dU5SdWFpRzhCVDQ2QllvSTIzOEV1RDRBNUJDeERzVjI2Uk51cEJVMFJUZ2ltZTNWMVBlWk9URWQ1TjllQ3lrX0p0Q2pfNzhEYVAzcm5NYkNaY9IBjAJBVV95cUxNT2RvS3dZbjFQdnphMEN5VEFHaXJ4ckd5eU1vekVZTGttVW1tcEROWmxYN2FtV3VBdWIwb3lzOGNEWXJqVlkwWEQtV2tvRTNIemVHcUZxVi00ajFXRGs0SjlTWlZKMTJpT2lzRkhzZHp4a2FSaUpBS3M2MTBLSnNWTERYM3VhR0pHQzVTdzQtUGdnZXllX2RIcG05VkZZZjhPTWpKOVVDYWxRXzBkdXF6cE80dXF6bXoxR2xhLXlYb3pKUExXcU90bkN6andvUWZ4S1JlVlVHRm9lVFhaZVNNUGxkbGU2ckVSaVRPdnlBRDRCSlFsTkIxbmNGckhBSTE1ZlhMbjBTVFFSMHJh?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T00:46:55Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "NDTV",
        title:
          "Nearly 12% Of India's Tested Spice Samples Fail Quality, Safety Standards - NDTV",
        description: null,
        url: "https://news.google.com/rss/articles/CBMirwFBVV95cUxNelBuLVlRbk9rYm45NUg2ODZkVldPZ2lIQUFMZTVmZGozT09aX0xtc0dnSzNDMU1YbzlvQ3hHcTZtY19RSDlKM2ZsdGxXSnJEZUVxWjBtcjRNdjJISTZfYk5NUFVEdnJiUjZIQlpwWFRMZ3FvdXdXRUlPdFFjb0IzSWRxV0VoM2wwMG03em54WHpUTWJqNE9ya3lfMTZXMHZKdVhaUGZCczM4ZlAxZWh30gG3AUFVX3lxTE1WWkJvbGRFY3owcXRpMFRtd3hueW1SVWtpMGRZY3NMempkRmZuamxGanQyQXpLVVZXTlNfU3VlRWFMdWktWFFPeDc4TkFjaEwyMmN3NXh3UFowMXRwRktmbUdBSGNkeFBGWnFYR3ZBeUYwVkV3SUFlOF8xd09zUFkwZkp3bjA2SzBRemVHdFozSUY0UU1yYnpWY210c2lmaTd0aFg1SVJHd09MQjUxXzMxckc3S1BXbw?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-18T23:41:10Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "The Times of India",
        title:
          "India Inc profit shrinks 3% in Q1, worst quarter since pandemic - The Times of India",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi4AFBVV95cUxQNHdyVmE4UlNpdnRMUTNLX2owNGNhZE9XYWYxbmphRjR4V0tPMVl1eEozUDdkbWxmV0M0WVJ0TEFZWGg1S1U2NldMLV8xblQyS1dpMDVFQ2pZV1FidVg5bDdKMUxkb0dTNjRLeWFfSHB0YkZObVpweVZIWnd2cjFkTHIyUHlqY2plRURjTF9NQ0hZWHc1dXFSaTEzMTV3bTd6RG1VekxzcVJhQUJpS0tjaG9yMnJkLVZwZ09VMnRwVXFzSWRlQl9tdUVldFR6empZSU9oMTNVQ3Jmd0YwSTc5bA?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-18T20:09:00Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "The Economic Times",
        title:
          "RIL may have just JioCinema as OTT platform post merger - The Economic Times",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi1AFBVV95cUxQYjgtVDlFdHNuMG10aDhjUDh3Ung5MmNXQmtSZ3gyZmVsYnllNmprMFNVdFZROXJGSFhJTVBpa1VzVXVTelVtTWxaLUpzZlk4NmkxZVdXMS1OYzdYNnJmOEJReHZVUzdtSGZfdWdXUllvY1NSVlM4N3E0LUE4X2VWOHRMWE81dVNwZ2hOcmJteFhCaDNXZG9ObmpUYXFDa3c3XzQzR1NpeG9fQVAwMGJCWVdyTlUxTnhtRjBnbS1ZMG1ZaUVIdXRIY3dHVFlQWG5lSFlUatIB2gFBVV95cUxNRTJMMEF3VVNJbUQ5QndlUWpiVVhYTUNHMTFxYml6Tmk0aXlWemdHY3YwYTFkMVNPM1VSdnptdVlldlc1WjVPRWlRXzBTTGlBWTU1TEpiSWVGTWI5ekh0bVU5eFplZTlibElpTnMtaHpZQW43TUhLNWNSWXZjOWItQVo0ZHRUbFZRdHJTS1dDR1JuZW9iLVdzUDZyaHprSUxkeUJYcmNjT3pJRWgza1BSc2RObjliSG9jMmpRMkluUWlyQlI5R3ItMncxcW9ieVJPSml4b0NvOUFrZw?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-18T19:02:11Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "The Economic Times",
        title:
          "Big retailers Reliance to Titan slash jobs by 52,000 in FY24 - The Economic Times",
        description: null,
        url: "https://news.google.com/rss/articles/CBMizAFBVV95cUxOVHVRbnJKSDhjQjhYbjFxd1p5MlRhcnVUWDhFaF90bVVVSXFJdjVvTzd0QmtjZEsyeWR1RUZhWFlrenpFdTc2N0MwT3JlOWk0OHl6bmtLQ1B0cURBRzBSWGhaWFN6a2daeWRkVXFFWGgtUGRqMnVZb1YzT29zRXVZc2MzU190NlBEdk43SEZZR1ZraW9jb0tMbDJpLVJSd050a1Q3UnhDQzZhYkMzOGpyODNlUEs5eld5bjdDN3lYLVZTaS1ILUNQbjQwcDTSAdIBQVVfeXFMTndScThIQkxBM3p2Q2JDQlJiU19kLTJ2bE81V2tkaHpFQktyQWp3anJFZ0JBN19HeDZUaVk3bmkyTzNCT0lvR0NmM25XdnRsN1JFQ0N0LWlHdGkyOHIzYmd5TjV2dFQtRDZnWW9PeEhMY3BRT0RlRy1ZYlR4MlZiTEx4S3lRRjZhVDJWRHVxUExhRzctSUxHZUlUWTdLMmZ1QXJGamRfSVdDV0pzWW9CX2M0Ulhrdk1oUHJtWjU0QkhMb2tJczVsTkU0Q21aSXJ6cjR3?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-18T18:46:52Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Mint",
        title:
          "Hero MotoCorp receives ₹17.64 crore GST notice from Delhi GST authority | Company Business News - Mint",
        description: null,
        url: "https://news.google.com/rss/articles/CBMizgFBVV95cUxQMzVURDRCM09XVnBtUWN2Y2dwUmFBMUFfNVA1MXNUQmM5UHVpZXJ0dXBUVXJiZ3F3MjJjb2lmTTJRenJBMnMtODNpRWRobUpFcDg5NGZuYzVlcXl2V2dGVUhlMHZqLTcxQVd6bmZ5ZzJKRDNIMDA1UFo5RlBKYkQ1MFp0RTNpd0FIbzd6bFFTTTFHMFAtOUV6empyem9nekhZSFV5TFJqdmR5TWxoSVM4bEhMV0V5dTBEeWF3bFlSa3BfVHkyaGdobWtRT1JEUdIB0wFBVV95cUxPYW9rMWthT2NKOHBNNjV1VWhyRU1jN1pncnc3dk5fX1ktN3FROGI3UW5jRkNNWWZoU3VIcDRZNzNIN1RNajBUM01sbVVQQWh2WHcyS1dvRVdlck9wMktuUkMzMHZUR2dDVzFLcEM2ZlNzUE1kYW1KTlFHRmxtZG1sdjFvVEtGalZQSi1RczFXTXFjbWxtMDFqRzZKQndaZVd6cGtINWpPYlkyUjVrTG9LTGlaVU1JTU1XLW1xeWQ3c0JwdTkwMG5TVDlpaW9mQXVWamZz?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-18T15:40:24Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "informalnewz",
        title:
          "LIC Agent Income: Regarding the earnings of LIC agents, the insurance company itself revealed the whole se ... - informalnewz",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi9AFBVV95cUxQZnlONmtxaVVmMTJ3VXhoUTRNNDE4S1p1UXFHLTdxMWJjRUFsdTZhSzBsRlpERE5CbVlMMnc0ZWVUM05tVHFHeHFXSk8zbHJXYndIaXYyWEJES3BPSzQ5LUZISThiemI5bUE0OXNTQkZwc1VoRzAwSmIzODlyS3VONUdHRzVsWTFSOEJ5S1VTVnl4UE1wLXZDMzZ0SHc3VllaWHgwaGt4dC1Wbk1pSEp5V0tCb0c2ZDhpQnRSRnRfTHAzWnlwYlNpUVpaWjBKam5sTTNiWTg5VmJuMzBuYjBXVklCLWY1dVNaOGo3RUlHUndjQjVx0gH0AUFVX3lxTFBmeU42a3FpVWYxMndVeGhRNE00MThLWnVRcUctN3ExYmNFQWx1NmFLMGxGWkRETkJtWUwydzRlZVQzTm1UcUd4cVdKTzNscldid0hpdjJYQkRLcE9LNDktRkhJOGJ6YjltQTQ5c1NCRnBzVWhHMDBKYjM4OXJLdU41R0dHNWxZMVI4QnlLVVNWeXhQTXAtdkMzNnRIdzdWWVpYeDBoa3h0LVZuTWlISnlXS0JvRzZkOGlCdFJGdF9McDNaeXBiU2lRWlpaMEpqbmxNM2JZODlWYm4zMG5iMFdWSUItZjV1U1o4ajdFSUdSd2NCNXE?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-18T13:15:50Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Indian Startup News",
        title:
          "Deepinder Goyal-led Zomato launches Group Ordering feature; Know the details - Indian Startup News",
        description: null,
        url: "https://news.google.com/rss/articles/CBMiowFBVV95cUxQMTY5S1VmZ1VVWGs5QVRxV0YweXF4emZ2LTZCZzk3Vnc5cC1Wc3ZfWXkya2NCMlZ0djdKTTBpaW5kR3R5WmNjbjk1MlR5YkplSm1xczlhU3pGZUl1YjN2YVU3VzdqOEROLXdaQkpGSWNwbkQ0dGJ1R3lIOF83RjNJUWpHUnJYREhhYlRqU0VtTlN4dlpEbEtNY0wyOU1EaFBiTjlF0gGjAUFVX3lxTFAxNjlLVWZnVVVYazlBVHFXRjB5cXh6ZnYtNkJnOTdWdzlwLVZzdl9ZeTJrY0IyVnR2N0pNMGlpbmRHdHlaY2NuOTUyVHliSmVKbXFzOWFTekZlSXViM3ZhVTdXN2o4RE4td1pCSkZJY3BuRDR0YnVHeUg4XzdGM0lRakdSclhESGFiVGpTRW1OU3h2WkRsS01jTDI5TURoUGJOOUU?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-18T11:42:35Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Benzinga India",
        title:
          "Zomato Up 3% After UBS Hikes Target Price To Reflect 19% Upside - Benzinga India",
        description: null,
        url: "https://news.google.com/rss/articles/CBMipAFBVV95cUxQWGFVM0VRWnZxa0NIMmNZay1vY0RwVFZFd09OaExLdkVWTUVieFNsZl9aSVV1WVJFTVZEYnVSVzM2d0xkWlQxYU82dkROYnV1dDdrTEYyZ3Q0ZkFZSURzN0lJeTdsYkVQRnZtblRITkxTNUpXT2R5blNKS3V1OHNXbnFfY3p6QllxMTduZkhCbTJVNU11eUd1Zl9Xb0tWcDQyTXhZQw?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T04:18:03Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Moneycontrol",
        title:
          "Mutual funds invest over Rs 2,000 crore in Adani group stocks in July - Moneycontrol",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi1AFBVV95cUxPZGN6cU03OVJVVWQ5QjFWbFlldkU4ZWd0MGV2N2V6dWxhNUdhSTl5cWRKbEktczlaZ2ZobHdxSDIwNXhkS2dPVnktVmFkcUUybnlXcFhLM3c1YUJTOUwtR0lybHlKcF8wYXR0UDVRaTlfRHdXRFBhSmpuZjR0VHJncW0xRXhWY0ZkNTBPb1JXQnpSZVBmRkQtaUJKZXlHeENZZlRtQlYyN3pYdFZnOTV0VUFtQUk0aFhMUHVKNm9QeElUTWtneEVzNmxLaEJwZ3ZTZVBzb9IB2gFBVV95cUxNUlpMMW9Uc2hjN3p5M3luLUNud2JOWFNMT194MFZtR2pEZk03cE1iVTRoYVZoU2h6eFFxR1BKM2ZULTBMdWdZSlVOcm0td3MyV1F1TmFCX3hkSDV1MU1zWU1oUlZxbmVXU0FpYVdmNGozOVJvRzhWWGh4QlRrS1Q4NTZ0WnlUa25VX0UwRzFha09hUXEyTTVTWmY5ZVpXOFNiQlR1Um01UEsxY2doNUJpS0ZtSU4xTVdGdFBIUVJjSm0wY2lqYk1TRTJZMkt2MzM3TjJrUFY4UGhsZw?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T04:17:47Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Hindustan Times",
        title:
          "Bhavish Aggarwal says Ola is world's 4th largest EV company - but wait till you read the fine print - Hindustan Times",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi4AFBVV95cUxPS2hjQnhuTnBPLV9RWTRfZUFVbmtFSTFVWU1hNzZBVUZDZllHU3pZQ0F3Sm41dElnV1dIYmtzZHk1YUZpemZRZlRjTU5IRHpVRGQ2Nzc2OHNRTjhjSVdESURYTmNla2dmUENQZDI2T2g4dFZMZ2FLVXhVUHdCcjY3YnBhdVB4WHcyR250ZnVGaWpWVXhSdzBNZloxRlFwbDhvU25xRVp1QjlFWWdVTVhSanpFcGtCRW1mM2hOSHFzRzdPWk5WMGo4Q2pXVXdfczVhTUNVWFNHMGJmZjM1X1dtONIB5gFBVV95cUxQZGU4bV9xMUljUmFUMWU4Z3p6aUlvd3hLUGMwbWUwOWdVWEpxMUIwa3VCd19qWlVCVldIN2VZakx2R2N3YUM1cXNlZWd6cS1lMFlBRDRQWlF1SkJwcXRvcHJzTkV4MGdPY0pDekl6TjU3cFVwaGdPZHBXeXlsQnRDM3NlQnJBWkxLQVZBdjVvQjMxQnZHSHVoQkI0TlJnZTkxZzhkT1g3aWJsMVdRR2VFZU9rYnZ0azJQRHZ6T1pFaXJRSi0yYmxkdFd6WkRhNThBQl9SNjhBTmxqN1UxbGs5UWZCUFU3dw?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T04:17:04Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Indian Chemical News",
        title:
          "PI Industries planning Rs. 900 crore Capex in FY25 - Indian Chemical News",
        description: null,
        url: "https://news.google.com/rss/articles/CBMioAFBVV95cUxQMGlNdUdHN3pMaTJ2Y0htX1cyaTJZbHJTZWlzaWRVVVJkOUJIY2d1Znd0T2NGWU55dzF2RldKUjRyRTRRTDQ3QWpxUXR1V2xqWE1aQV90Rm9URUx1QkgxUmFpX1lTeWh4MEg2Z3JZQXFxSzBGdnFNTlMzRjlCcmNjbjJnM3k2SElaOVFlLUxYSUl2Q085MHFab282M29lZ0do0gGnAUFVX3lxTFA4TGxJNktpb2x4VGkwSHdOeGhwMG1QbU4tQ0NsN2h4STRjU19QSXd2bUx5RlFCZWxucXJwOXZHS1JkYURxV1BrS3d5cy1sQ0JoOVFVNElTaE14Z0NKZk1lYzVDZF8tR0FUNlRLbmdnc19ZZzRXWVlnaVZialRDTTlGMXdPV3ZpcGtIYWhtNFhKNVdkbmJMZE9GMk1DRldjUWNoQkU1YVFj?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T04:15:11Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Benzinga India",
        title:
          "Voltas Shares Upbeat As Brokerages Raise Targets On The Back Of Strong Q1 Print - Benzinga India",
        description: null,
        url: "https://news.google.com/rss/articles/CBMivAFBVV95cUxNVFRYYkp3bkZzaGdyMlE5cUtMc2hKcC1HZS10RUx3bHV6X2tTY3MxZUdxSGt2bjluUWlXeUEzVm1EWUc0VDFDbkpoLURjdERRMVFNX0VVbjdxUW1wcE5sWU9IN1BCOUJfVkNtc1lKMUJQbjRKQmJKRU5HaTcySnVocXpnT2hxRlRTQkZXbnVhMDNBRHdLNlRJbVRRc0lTQThucHEzZ3lHZ3BCLVhZMGVnVkw0NVFacXNMWXJfOA?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T04:02:45Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "CNBCTV18",
        title:
          "Hindustan Zinc shares fall to OFS floor price after fourth day of losses - CNBCTV18",
        description: null,
        url: "https://news.google.com/rss/articles/CBMizgFBVV95cUxOUGF3NzczWlk3WG9nTW9RWGI1M1RNeEV0VjFVdHlEVFVIZE5teDFmVF9vVEVBSjdBNERpdlFIYS1Ja0RsNDE1QTJLRkdjcF9aM0laRnFkdlUxbUhER2xQZFJMRU5IRVh0MTFnVUlJNGxiS25MYktNR1pwRGZOWWhNSGFtUzZCNC1kQXdMQ19uZHFkVTJxemNHbWVyVmpnc2J0enZVN1J5SHFhTS1YRWxTc19RLTcyaEN4clZSSUdTQnl2RVYzVnJDcnUzdVRDUdIB0wFBVV95cUxQaUdkcjFuanh2VVNqRDlRY2RYejJuRDVyaUI3NGZNaXR3MERkUGx4UlJXMUhkVG5KOHRsT2Jqby01anBxYnBOVGFYczVMMUJoOVY4endRaHo3SDZNTEd4X293aWtzV1BCUjg5dUp1Qy0zWm5KSEpLWThvalNVNlZSNEJ4SS11bUJaRGM0bUdpdmlDd3IxM1RIUUlJclFrVHJfc2VYWWgwV054dTY3SmZwbkkxTkh2NlRmZENneXRzLXdfa0E3bThKZjRrbkJJaEpwcHBr?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T03:49:35Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Mint",
        title:
          "Stocks to watch: Hero MotoCorp, GMR Airports, SpiceJet, Adani Enterprises, Hindustan Zinc | Stock Market News - Mint",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi6gFBVV95cUxNYkZibnpsVmNZNUdqdmRNd1R4ejItSUtmSkE5YmZaM0dDZnR1amVjc2NaWjVhckd0Q0hvSUxtWDFsNFYtbG82NU1ZbzR4VXM0RFh5UkVhNC1oR19UMC05VFpxbVd2enYtU091UWlTMzdkM3FVb2NqaTYtaGRwR2NldGFRQXpQb2paVW04bXBGSFAxalhyLVVqZlY0SHM1NXI1VDhUaFFtMkNCTE13S08zNUJSWnFuT01HdVEtcEFfRDhnbVVuSFJlUWRJTF9LbGp5NHZuakhRTUVVN2o4OXpZWFQzczBSYkt1dkHSAe8BQVVfeXFMTU1fSlVyZ0ZzSzg4S2hiTkdfWnNTWVJJa0Z4TGhRLWQ3ZERoM184WlNTbExGU2t3enlIMzd6T2pJUG5qY1JQQXowaHlueG83YUdHUnRKM19sUnNJZ3I2WXFobThnbTBJNERRbDBhNVByT0tLT2dEVmNpNE1VMG1ad3VianVOY2I1QXpkdElpNklWUURfM2xXTWxWb1Fla3QtRVN1ZjZJb0hSR2tFVkxOcm5ZbGVwRFdUbzR1aHVHazFwdEE2bXljMEJrX2RLR3E3aERnRFBXVEhRVkh4d3RiWEJNYVpTVEdhQldQZ09CNjQ?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T03:01:22Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Mint",
        title:
          "Breakout stocks to buy on Raksha Bandhan: Gravita India to Anant Raj — Sumeet Bagadia recommends 5 shares to buy today | Stock Market News - Mint",
        description: null,
        url: "https://news.google.com/rss/articles/CBMikwJBVV95cUxOUWxhNEp3U0hNZUh2MndLNFU0Z3hyN05jNXB2WjljLURWMjNXc3NCbVJZRzJrWm9pYXNmUE91bk1wbFlIRklNVXpvY015dEhlbHlXS3FVanVTWXl0T2E4WnRLWERlTTFpbzVteFJlODlEZWdrS21rWmxGWjhKcW5WWEJlb3pMNDBROHZJT2syeWZtZkhlWm5lTVEzMzg0RnlNTkFNTlhWb1Z6RTZrbnpwRTVTQTZ3OTZFRnJydlRmUlAyV2N2cDViSkVFQV9vUDlsalpvTzdKNUJYMGR3czNCVnpoYTFmRFhIQmItS0dqWHU1aXVQNWdaSC0xTU1Gc3d2TDZJOVJpMTNieXZvTThaelAyONIBmAJBVV95cUxPd0pjOU8wVjNpMmtMSGpYR3ltN2V1Sk9SX2ZLMnEyUDBnc0lyZ2hWQUt6MkdncXlnbHJQWXhieDhRZDRnd0sxdmJyUXFOM2pMLXIzTFNBUGgydzhPMmNJeVlJNjM0S2ZjeFhBMkg0NnZSa2pOeVhmUms5OS1jMnZMVGs2NG0zMmtzMHdlSDNvZVZWSi13Z3A4Z0NEenIzajNFSE1fdzRLdTBfT2VBNWhaU1RHVVFUQUwyQm8zczM0aHl3LVV0QzZ5ZWRwMFBxMHNhSUx0UFJjMmV0cWJXdURRbXhxNWVPZEZEZUxYZ1NMeU1VUUFJS0ZkM2ExaEQtUUZ3THJycGdWNUVtUmN5Wm82NnY1X1NkNTdK?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T02:24:22Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Mint",
        title:
          "Stocks to buy: Bajaj Auto, MCX, TCS among Axis Securities’ top 4 technical stock picks for this week | Stock Market News - Mint",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi-gFBVV95cUxQQ0VQaGFNanpzWkFSbmFCc1FJakhtc1hnRTROSGdlVjRDQW9yd2xGWkNuQ0ZQTG5JUnBQemt1TzF1QUFHVTUxelZDV21GVnRhOHZlemJLaHIzOGpCS292clltSFpvMnYxRVJQSi1sU0xnN2hzWWJldksyY3ZLbXIydFBaLVhUUDZGc0FZMW1xUmZDX3pDWDdHME1PYi1LaXpQLXV2UW0taVNlVE0zbGl5RWNIaFp5azM3SG52TWdYNGs3cEJYcFFmejhGampiTVk5NmR4X0NxejBsU1N3U2RHd1lHdHBlZkMzYTZOdFU4cWhvUGQ5RUF6dk5R0gH_AUFVX3lxTE5ucUlYOHlfSWpiOUU1YjRfMmlKdGNQX3MxcjBQV25YQmJkOFQ3TV9KYTZFNzZJZktWMlh3MmZaSXBLTzB2akRFVUdiZ0l2QWltdldvS0Y4SVhfRjh3bURfZF81Vi1iUFp2c01sUnRYekVnWEpkNWI3TGlPN0lHay1JekQ3WGtwRHIxQUh2U3R4ZnVSZV9POE93TmhBMDdkdWZSYmpCbTNFNmhIMlV5ZTd1OTBqZnQwNjJkZXhfSE1KbUUyNkZ2M3VqazdqZlZpZExhUVpKelRyUXI2VklPbWxFV01Uand4RGZQSWRCWERRd2oxV3dBWE9QdjVZSjJSWQ?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T05:51:16Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Mint",
        title:
          "Arman Financial Services, Dreamfolks Services & others hit 52 week low today ;Check the full list here? | Stock Market News - Mint",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi5AFBVV95cUxPOFY4akNNSmk2MUt3bU14dFhIZTU4bXoxSTlaOGJGY2NtN3IwS19id2pOdGNSaHQ2cnlPUmFUNTJwRTF3NkJkNlB3cVZOSnhIOVNoamUxeW5xOS1lLWRqNXhYY1kyaEhvSmYxcFpJb3JOTjlCVEU5QUM2amJ3SEtpWkhVMzc2MXp1NVUyU3dCWVN5MDMtMmdLM1pXMEpIaVZMQVZBOGlaUnpHdDdqVWZsMTN5VUlMTlRJazZ1UkpNamxhbmRPZERlWk9sV1NzNVQxNEgtZC1lU2FmUW9VVm54aWdpV2fSAeoBQVVfeXFMTVZTV2RTWUczUGRRbEV5QkZaWDg3TmRFZ1Y3MGpaUWVNek04Wm5XYV9TRnlidUZBSmpyUWZyV1dzRkdpZVlKcUlmWXZHbDRlbTJmckVyQWt6azJVY0ZzdUpGeE1WbVY3Y1BPaGZEN2wxX0ZaeV9sX2h6eEY4THJOYlRNODRxaDJGTXVveU92d0dWdDFmR0F6YmtsMGFRTnRoOElKUHhFSk5UanNDMUw2SFlzWVA3amY1c19HTXdTRmNhYjI5VjV6NFhhb0lCREdGdTVzY0xqMVZJTWRxbVZibTAwUFA1czBoSWZn?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T05:30:03Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Team-BHP",
        title: "2024 Citroen C3 launched at Rs 6.16 lakh - Team-BHP",
        description: null,
        url: "https://news.google.com/rss/articles/CBMidEFVX3lxTE9jX0FsMVhiTWtmS1EzalJRSkVnU0lKaS1XclM2a1NGMktYbjlYLUp0MC1mVkVwWS12RXdsTWYtbTJHcUNxWTZEYUhHdF8wQ3BrN1YwYXZfRGlMdFBRbXlBQ1NsMG5kUTBUR1ZNQVMwZWY5anlo0gF6QVVfeXFMT0JmaUxsQ1BUcE1yTkxoYUJkRGNEVk9aN1llRElOTWtVM05fRE1PY211aWRrb1d3OG83eDRYSGNub2RpNlFvQXdCWUhTTHVLbXNqQ09rQ3BFbXUtSEVCOGhXbWZDR3k4REFzVnI1TDlyYWctWUpHd0JQMVE?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T05:21:24Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Live Law - Indian Legal News",
        title:
          "US Giant 'Burger King' Loses Trademark Infringement Suit Against Pune's Iconic 'Burger King' - Live Law - Indian Legal News",
        description: null,
        url: "https://news.google.com/rss/articles/CBMiygFBVV95cUxPQ3ByaERlbFdzTUw5dC1fd3JWNkJ1NWxrSGNIbURhUTFzRjg2dUF5eUplWm1vQ2NtbFB5ZXVMRmwyMEpNTWV1OUFUQm84ZnRLbS1hb2xpQUVtLU9VaFFxY0xhTGhYcGt1ckNzQ3Y2WU5wQ2JLeTAtMG1CcmY3a3J3eGQyN0RrdjR5LWU1VXFCclo3V1RnU0d1Q1VMcE0tbENqc2JpOUtYVTkwcDhYN3k4NzVvTGt2UkRxZUI0Q09qVU1lOWhyemlwTml30gHPAUFVX3lxTE9NWGRSZ0hfdm1Vc3pQQlJTSXRoMHpaZWRhdENsU2plVngycHdBX3ZSTl93SFVwcGd5ekNtSFloNnU5bGFyYWliTEFEV1ZDei1iSlNMbVFzNDVJbkpkOFoza0Q1N181cVk5eU9qc196WkRFZ2V2bTMyX2dhLUJzT01zZWpvc1hCWnpEMTRsYWhqZmtWdHJVSm1FZDZINl9rY1VPWUtyRGNkRkpEaS05OEVZVXkxUTRVSUNyVThCR0V2ZkMyUUZxX2xjMlUyQnpsWQ?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T05:21:03Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Business Standard",
        title:
          "Adani Power to acquire Reliance Power's Butibori plant in Rs 3,000 cr deal - Business Standard",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi2wFBVV95cUxOZjljREt4SFhOZ29wM3lkWWFuOWRPY3NrTVhWaUZfWkp1NFdPSFBrSEt4OGQyRjJWRE1NbGhxWWRzQUJTcnhWeUdQZ1ZCZnBzcGV1Y0R5QUlvbzV2eFhvOUJTQmwyU3JKWFVQTUZoTXdUejJ2T3pWdFdxQTUtSGhycElkZ3BlaldSaGpsXzZ2MXNGOTAzakZfN3VXS1dYY0h4d3ZuM0hzRXRMQ0F2WWQ5am9NaEhYR0lSNUpvVXNxeVZlb0NvZHRfSFdUUDQtZXdMdmxVUG8weElaNk3SAeABQVVfeXFMTUZ1OW9zX0Y5SXBuR000QUk5OU5hX0toSG9pWVB2VEVydHBPbWlqRjM3Z0VNMHVaZVh3bEplZER6QU4yRU5iQ3d2a0E0UjR4cUtGcWl2bDlRa1FZVzRrRlgzREw5U2lxci0tWVBrUld2QnFQLUoyV2NCTlh1MkFKZTJ3SGxsemY5aDExUmtTVlFUQkxaWXFWUnVCVmt0STJQTUllZm1hT3VSYmZFU0ZBbXQtbXZkQVVCQzBaZk1XcUVnRkVaTHA1bExJdHNxcjZtcUNnZllHREpFTnNWQWFvNWc?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T05:10:55Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Trak.in",
        title:
          "Ratan Tata Building A New City In Tamil Nadu; Will Create More Jobs Than Jamshedpur - Trak.in",
        description: null,
        url: "https://news.google.com/rss/articles/CBMiqwFBVV95cUxQV2V4bFVWNnRmWF9KYVJxMEl0T1hUUTRvY0xQRkFhUFU4RUxSc0tGOGJnS3NZa0JoaU9nMWo4OG15OVVWb1J5bE5uX0pTWllwM2MzMWpIZGNjV2FJQjJEdE9nd2FBYW5GVWJtdzhkS0JEem9CNnAzRFpLWE5MTTNFZHVPeUQ3Z0xnZTBqOUJuTUJZQkw4WUJRSEZWZkVGTXhrREtlektEQ2RobUU?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T04:48:14Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "ET Now",
        title:
          "Rs 325 IPO GMP Today: Subscription STARTS! Check company name and price band - ET Now",
        description: null,
        url: "https://news.google.com/rss/articles/CBMiwAFBVV95cUxQb0JiczY0UVMtN0Q5MG0tZkxvZ25tMC04b3MxZ0RQVXVUbWFIVENaNGttSlpZalZubWdZLVlSNTNKZGxGU2kyS0FaMmw4M29kMFF5QW1kTUV0TGs3WHh1YzZFSFF6UFZlUThadk5fSm1Rd3JRSjQ5SEFDLWdJb25sbGRoelJzVFAycm80WGNnck1KVFA4ckp0V0RGdWg3V0dzS2xlTUZnS3RFNWxNS0ZpSlNCT0pJTEp1VTdnVmZPM2PSAcYBQVVfeXFMTk83cXMwWi0tc3hVQ2gtUng2LVY5cGlGbjY3dHZtMjRfcXVlcTJla3k2NTZoU1EtUm5iaVFhSGpCS1hBdnBKaHhQeGVjczYwaWxpdVBkX0NsME9FS1lhd1lmNEtIcGN6YzFZQUhnSmtHQ1JCOFA4MGdXLW1XMGJIbjJXQ2d0al92MXVmZno3RTRsSkNZYkJRRW84Y2xRd0w4TmxGaVFfMmZIb21IaUI1OFpBc0xvdWtVdmx6V05faHhtdlEzSlNB?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T04:36:15Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Benzinga India",
        title:
          "Maruti Suzuki Share Price Muted Amid Tax Impact Due To Budget 2024 Rule Changes - Benzinga India",
        description: null,
        url: "https://news.google.com/rss/articles/CBMivAFBVV95cUxOdnhYLVBQV29scFVlSFdvOWYxZXhXOGlTQTUzeUxFclNUR09tRk1ubHdfUUtQMlJLZXdoRUNEX1FOMzJNR2ozbks4dGZ1dmVBMmFJT3YySUEtRkhhT3VOUlFfc0pKTmNMRG1STi12THZKTnNuLXNrMkJtSld1MFJUNUNVNzF0VXNxeFlGOWdOM0JWcUtwYXlxQUJ4dFhSLVo5OEZsM2lQLW14cFNtZThhQVJ1UzNzTU1ncmd3UQ?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T04:21:17Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Benzinga India",
        title:
          "CDSL Shares Surge 3% After Shareholders Give Nod For Bonus Issue - Benzinga India",
        description: null,
        url: "https://news.google.com/rss/articles/CBMipwFBVV95cUxPcDNtc0VUYmRWN0FfdUZibzY4YWIxYnVQUDZDeWJQa21CVm9xWEpDeUFoalJBZURtN1g4amlTemlydGN2MWdlNFdLQ1ZOd29LZmdfUVY5U01XSWg5X0xyNktYZnQxMjczZlRZU2xZMVdHOGxHU1hzaTRONGJBODNDdTFPV0EwaHkwUmtzaGRyOFRXWHFDbGhLVE41cE5yMU1vZmhsTVlycw?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T07:23:57Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "The Economic Times",
        title:
          "Bank FD interest rates touch 9.5%; now 47% of FDs held by senior citizens, why it is time to change taxation of fixed deposits - Deposit growth - The Economic Times",
        description: null,
        url: "https://news.google.com/rss/articles/CBMiqwJBVV95cUxQZEFSek5FbjVFLWNBYUtaSWZ4V3c3RXlBN1hxa2pnNzhRNi1KcHJ0ekdsWE9ORTJHYUxEOU9BTjQyRUc0ekwtNzNoTWwxb2dRYXhfRDYzZWJFMk5WYkpFaW5TbXdER3Z4M1B3UkFid2RvazZXcU96NWZaS0VsTGFsRC1LelRMSzNEMzIwcFlzczdSbUUtQW92eW1fNUVMVmloVVhGZktZSU9pYzVWdDVqamotVnRHd3JJb2NxN1c0Sno5ZkdVUHhTUHdydmJneFFSMXRlLWdLR1QyNEFmV2x4WExGNTdkU3N4QmdsT2prVkE2THRZdWpMUDg0UHBjeFRTTUFwMjlYSmxfSUVYQ0ZaOGNFd2U5LU9VREFkLWh3enRYWDQ2a0NHMnM2dw?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T06:55:31Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Moneycontrol",
        title:
          "WazirX laptops were not compromised, says third party forensic report after $230-mn hack - Moneycontrol",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi7wFBVV95cUxPQW0tUzNFdVR2UkhSZXQxUkE4OVlqb3JhTnU3RzBJaTRrZl9sVjFsTnBZYzQwb09Ja20xTFdWVmZpQUp2LWRnX3FFX1ZtajhtUjBzYzFMUkIyYUtaUkt1SU5ldXROSGFOV21UU3k2SHVFTjFuSFF2WDZBQmMwMldjR0hRRTRuOWM4TFg1VUpWcUdWQUtsLTNqMno5aHlCYk5uVTJOQU5ZQ3Z3UUhlNU9JN2p0U21EWnotb01sOTJLWXpSeWNuMU02eDc3dDdRd1g5bXI3NGxnMk5pLUNaWk1TRFZFUmdnRnJFYmQ4YnRoVdIB9AFBVV95cUxNTk51YUl6X3ppcVJkMi1FZEVOT1Rkd3JYSXJNVVZjakRreTgtU3owRHFIaDVmZTNoZzVfS1owSnBoUzVKeXRVY0Ytek85blZDLXcwTl9XMzhfcHJPY2MtQ3NlanF5SldTS3k0RVNoODZmUWozWENLcWt1M29wQkxDRlN3VndQVjN5djE3S2dISGpVa21rNlpfcm5UNDZCQlQxUjZ1SEQ3M3R2YWZyWGlXcFl2bG5CV01aR1hEM3J3d0tfbEduUWJNX0JteUpJUkVJa09leXZXbEZfSG13X1YxVDBRS3FCV0pTSUpXRDdXQnN1aHVB?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T06:46:44Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "CNBCTV18",
        title:
          "The best yet to come for businesses like Zomato, says Raamdeo Agrawal - CNBCTV18",
        description: null,
        url: "https://news.google.com/rss/articles/CBMixwFBVV95cUxQT1lGWEpNMGJjb1FkRVhtVTFVV2p1M1piQWg0eFNTVUN6VHdpMlJFVWJLeEdZTXJDLVljTXlzOFdPT1BHTy05MWhrcHZtMUFqa3NwbGJjQTRNeHVlMm14UjZsckRrQ2xQLVpDNDg3UTQzMDZVSC15Um5NZkZlQlNVLXV0Y0tuMExELW90TV8zajA2TkRaWVRremtpLW5sWjRiUTZWUUwzVTZvVWpwS19qRFcyVXVCaC1Bb3B0SEdPTFdfcVpBNmw40gHMAUFVX3lxTE00a1padURLTzZXTTFGU05LRUFueVdBSWgxOElLVHJZbTVWcGV6elZmZXdnQm1iU2dNMGpZYWgzMXMxRkVFOVhBMlVBWl9Qa1dEUENYdGFiZzRUSWV5dVdMRGstdTZGQlRGbUxiVEktZ21EMEhZeW9tTl82OGwxSnhsUC03WmszWHpudWpudldMZklTbjJWQnFMd0x5a2ZUbVdEaVJ1enJTMENqNndrZlExSTVhV20tMUxMNWNzYU1zM3dCMHdsbVRVNXRiMw?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T06:38:22Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "CNBCTV18",
        title:
          "Mazagon Dock, Garden Reach shares may fall 77% despite robust Q1, says this analyst - CNBCTV18",
        description: null,
        url: "https://news.google.com/rss/articles/CBMi1gFBVV95cUxQR2FmV3k2OGQtWDlMbVdLV0RrSVVhdFR2d3ZmRURVc1NvUENRSkpuRUltdE5lWXhVMXRlaFNiaDF1MGZwX09fVW1kU1dmRUtaOS13QmdzNndQSVZIdDZ2QlNkazBuQUI1S2JtMmhXN3JKamJ0SVEzbUpGN2RpcjNPZktwaEk3Rm51UTZzVUlfcU5lMTRtakUwb3pJYktTM2NMbzZ4WVFTWU8zcDY0OURXZ0NROWxqaXRIazNMbEw1WGR3cERGMkNsM0hacnUwWDdFOXI5NG1B0gHbAUFVX3lxTE5EaVNyMFNGbUp5VHdHNmJNTnZsWV9vbnhwMDBPNFZkRVVDRDNPWVpRRzdoa1liRzE2QU5GbVhfZXREN3BNNW5INTNGVHlBSDZMYUZILWJHdnlGSy0wc0wwYmJXN3NJX0VxT1FiLXcxZk1mX3FCVEw1aHRNRE9hdjZYdjV3bzA5cEJlWndIVzhWbTRhYTFHeExiUmcxM05LaFNCNl82ZERqM2ZyeFR0RG1mS3lUNUpvUGhiZ1hTdDB6akNCRkFtZW1uYnlxSHVuSUZnRFNGbWk5QmVJQQ?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T06:18:38Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Moneycontrol",
        title:
          "OMCs bet billions on petchem amid rising risk, market shifts - Moneycontrol",
        description: null,
        url: "https://news.google.com/rss/articles/CBMixAFBVV95cUxQSlFBNmtTSU1BNVBUeXZmZ1R5eU9fVnVBUDYtYklkaV9Cc2FxTXJVT01tNGxWT08ydktjZ3Z5R0FNTzlHSExiVHd1djFfLTBmaWV6Q1B6dEtoT2JlUVo5SjRmMU1fM0szZG1XTHlJOVcydnpxSlhscENWbzlvd1pCY0hsX2JRX29NRy1fZGswaDJXVElSV0JRM2tYZkxaaTFaVFVtdVFwbHlDVXZpNnJHSVZMVklBTzdrcVJFV2Z4Uk9kVnUz0gHKAUFVX3lxTE9pMlQyNnZWT2VlZnAxQnZHRzMzQUZadXZpT2p0MS0xckdwRjE4S003TnMzU0wxcFpRc1hQWm5tSzVrTV9yWWoxYThmVnRpUjY4ZzQ1Q05ZeHh5anJDN3RvRHJiakhRS3NVVTJDcG5WZ2ZZcENzVFFYU1lCYVZiQ3M5MzhYaWVNMWFlZVh5VGZnM0xRaGV0c21TcWwxd3Boam9uOXBKZWZOVmw2SUFhQlAtRmN5ZlRyOGFlQm1XaGEzS0J4UldQSUNrMnc?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T06:13:04Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "CarDekho",
        title:
          "5 Door Mahindra Thar Roxx vs 5 Door Force Gurkha: Specifications Compared - CarDekho",
        description: null,
        url: "https://news.google.com/rss/articles/CBMivwFBVV95cUxPVjBITFc5cWswMkw2ZUFURW1CZnVVZEc3Q01EM2p1OTg2OHh3eEJ1UFBYLVdRekJfVTBycXcxTFF4ZC00dXEySDVGOU9UaVRNT0pac1V1dE9pS1o0blhJajM2a01ScThiRFc0SmxWR3dVTTR5ai02UjN6UFdrdUhFd1ZjMDVhQjdsOV9mYXBZazQzdGM2Q2VxbmhwZTREUUxNYTNJWjdZelMxaG9kVm0ycm5jNzFFVDFzdWxSa2ZORdIBxwFBVV95cUxNdmtPZzJQV3gwZnM2ZzNrZ3o4a2F0ZGNYczhMUFpMSFF3THl6bjFhampncjBINmVzSGtORTZvOWhiQWlEZDlXWUlPQTR0XzFwYVM2ZzZyQzJaVFRkQ1dRamI2QjFkU1N0dHZQTFBidFBtaUVOa2dRX0F3Q3NwRUZ1VGw0NkpXTHNpZlNqeVBzS2YzWS1hOEtnelpCVGNjQU9mU0FkS1I2YzV5SEdGUTJPRjM4UzFRWnI2ZDdsZ25QMEZSODVkV1Rr?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T06:11:00Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "The Economic Times",
        title:
          "Tech picks: Tata Motors, Birla Corp among 5 stocks to buy for robust returns in the short term - The Economic Times",
        description: null,
        url: "https://news.google.com/rss/articles/CBMihgJBVV95cUxPb3lsLWdHOUlKZHh5NkNTek5oREw2SWtPaTV0TElpQnZfYlZiWFhYblZGeVp4dDBvRE9ZS05rYjFyLXVrcDhkOS1aS0tsQllxVS1VLV9MN05zMEl6MEw5ZDRDZFI4RFZwaGpDMW5fSWw1TlBnSXQtRUZHdTBmQ0VEM201M2JneGVnTmlEekFIeVZQZFBOeHpsLXF5MWJtMW9CNkxaQ0VvTW0yeEpBY3BDUFB1UV80azR6RWVXOWVWQTNFM1F1VF9GMm81NXVCTllJOHd1aFNSUE5Xa1Q4Q3gxRHVfNVlSUEVEb3RWcWRrZ0dkbF84b2ZsdXJTTkVZR0tMbTFpbld3?oc=5",
        urlToImage: null,
        publishedAt: "2024-08-19T05:53:49Z",
        content: null,
      },
    ],
  };
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    setProgress(15);
    try {
      //   const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
      setLoading(true);
      //   let data = await fetch(url);
      setProgress(30);
      //   let parsedData = await data.json();
      let parsedData = staticData;
      setProgress(70);
      setArticles(parsedData.articles || []); // Fallback to empty array if undefined
      setTotalResults(parsedData.totalResults || 0); // Fallback to 0 if undefined
      setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      setProgress(100);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    const newPage = page + 1;
    setPage(newPage);
    try {
      //   const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${newPage}&pageSize=${pageSize}`;
      //   let data = await fetch(url);
      //   let parsedData = await data.json();
      let parsedData = staticData;
      setArticles((prevArticles) =>
        prevArticles.concat(parsedData.articles || [])
      ); // Fallback to empty array if undefined
      setTotalResults(parsedData.totalResults || 0); // Fallback to 0 if undefined
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  useEffect(() => {
    updateNews();
    document.title = `${capitalize(category)} - NewsFire!`;
    // eslint-disable-next-line
  }, [category, apiKey, country, pageSize]);
  return (
    <>
      <h1 style={{ marginTop: "70px" }} className="text-center">
        NewsFire! - Top {capitalize(category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles?.length || 0} // Safeguard against undefined
        next={fetchMoreData}
        hasMore={articles?.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles?.map((e,i) => {
              return (
                <div className="col-md-3" key={i}>
                  <NewsItem
                    title={e.title}
                    description={e.description}
                    imgUrl={e.urlToImage}
                    newsUrl={e.url}
                    author={e.author}
                    date={e.publishedAt}
                    source={e.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default News;

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

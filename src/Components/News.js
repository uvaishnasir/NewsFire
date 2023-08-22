import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  articles = [
    {
      source: { id: "cnn", name: "CNN" },
      author: "Veronica Stracqualursi, Shawna Mizelle",
      title:
        "Asa Hutchinson says he has qualified for the Republican debate - CNN",
      description:
        "Republican presidential candidate and former Arkansas Gov. Asa Hutchinson said Sunday he has qualified for the first GOP primary debate, which will take place Wednesday in Milwaukee. Hutchinson joins a crowd of White House hopefuls looking for a breakout mome…",
      url: "https://www.cnn.com/2023/08/20/politics/asa-hutchinson-republican-debate-cnntv/index.html",
      urlToImage:
        "https://media.cnn.com/api/v1/images/stellar/prod/230820081546-asa-hutchinson-0728.jpg?c=16x9&q=w_800,c_fill",
      publishedAt: "2023-08-20T14:12:00Z",
      content:
        "Republican presidential candidate and former Arkansas Gov. Asa Hutchinson said Sunday he has qualified for the first GOP primary debate, which will take place Wednesday in Milwaukee. Hutchinson joins… [+2749 chars]",
    },
    {
      source: { id: "the-washington-post", name: "The Washington Post" },
      author: "Arturo Torres, Samantha Schmidt",
      title:
        "Ecuador votes for president after candidate Villavicencio's assassination - The Washington Post - The Washington Post",
      description:
        "Some Ecuadoran officials worry that the violence could escalate in the days ahead or even as voters head to the polls Sunday.",
      url: "https://www.washingtonpost.com/world/2023/08/20/ecuador-presidential-election-fernando-villavicencio-assassination/",
      urlToImage:
        "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/ZYQBM2JOEI3QP5V2C6IBSIIWPM_size-normalized.jpg&w=1440",
      publishedAt: "2023-08-20T13:55:13Z",
      content:
        "Comment on this story\r\nComment\r\nQUITO, Ecuador Ecuadorans head to the polls Sunday for a tense election just days after the brazen assassination of a presidential candidate underscored the extent to … [+6679 chars]",
    },
    {
      source: { id: "cnn", name: "CNN" },
      author: "Megan Thomas, Chris Boyette, Eric Levenson",
      title:
        "Ron Cephas Jones, Emmy-winning actor in 'This Is Us,' dies at age 66 - CNN",
      description:
        "Ron Cephas Jones, who won two Emmy Awards for his acting on the hit television drama “This Is Us,” has died at age 66, according to his manager, Dan Spilo.",
      url: "https://www.cnn.com/2023/08/20/entertainment/ron-cephas-jones-death/index.html",
      urlToImage:
        "https://media.cnn.com/api/v1/images/stellar/prod/230820082420-01-ron-cephas-jones.jpg?c=16x9&q=w_800,c_fill",
      publishedAt: "2023-08-20T13:55:00Z",
      content:
        "Ron Cephas Jones, who won two Emmy Awards for his acting on the hit television drama This Is Us, has died at age 66, according to his manager, Dan Spilo.\r\nJones was best known for playing William Hil… [+2576 chars]",
    },
    {
      source: { id: "cbs-news", name: "CBS News" },
      author: "Anthony Salvanto",
      title:
        "CBS News poll finds Trump's big lead grows, as GOP voters dismiss indictments - CBS News",
      description:
        "At the debate this week, voters want candidates to focus on making the case for themselves — not against Trump.",
      url: "https://www.cbsnews.com/news/trump-poll-indictments-2023-08-20/",
      urlToImage:
        "https://assets3.cbsnewsstatic.com/hub/i/r/2023/08/20/5c575a02-bdc0-49c7-bd8a-f15ae96522c4/thumbnail/1200x630/758bf47c99713f04958e1a2ac26266b8/gettyimages-1610268501.jpg?v=0b4ae642db52799a178d90d83603a9dc",
      publishedAt: "2023-08-20T13:30:17Z",
      content:
        "Well, there's no debate about this: Right now, the Republican Party would easily re-nominate Donald Trump for 2024. And it's not close. \r\nThe former president now holds his largest lead over his riva… [+6508 chars]",
    },
    {
      source: { id: "abc-news", name: "ABC News" },
      author: "Katherine Faulders, Jonathan Karl, Alexander Mallin",
      title:
        "Meadows told special counsel he could not recall Trump ever declassifying Mar-a-Lago docs: Sources - ABC News",
      description:
        "Trump has insisted that he declassified all the materials before he left office.",
      url: "https://abcnews.go.com/US/meadows-told-special-counsel-recall-trump-declassifying-mar/story?id=102396159",
      urlToImage:
        "https://s.abcnews.com/images/US/mark-meadows-gty-jt-230819_1692480234742_hpMain_16x9_992.jpg",
      publishedAt: "2023-08-20T12:47:12Z",
      content:
        "Appearing to contradict former President Donald Trump's primary public defense in the classified documents case, former White House chief of staff Mark Meadows has told special counsel Jack Smith's i… [+9266 chars]",
    },
    {
      source: { id: "espn", name: "ESPN" },
      author: "Mike Reiss",
      title:
        "Isaiah Bolden out of hospital; Patriots-Titans practices off - ESPN - ESPN",
      description:
        "Patriots cornerback Isaiah Bolden has been released from a hospital in Green Bay after he was immobilized on a stretcher following a hit from a teammate Saturday night.",
      url: "https://www.espn.com/nfl/story/_/id/38226587/isaiah-bolden-hospital-patriots-titans-practices-off",
      urlToImage:
        "https://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2023%2F0820%2Fr1213031_1296x729_16%2D9.jpg",
      publishedAt: "2023-08-20T12:45:00Z",
      content:
        "GREEN BAY, Wis. -- New England Patriots rookie cornerback Isaiah Bolden was released from the hospital Sunday morning after absorbing a hit from a teammate that led him to be immobilized, placed on a… [+3058 chars]",
    },
    {
      source: { id: null, name: "ScienceAlert" },
      author: "David Nield",
      title:
        "Physicists Identify a Strange New Form of Superconductivity - ScienceAlert",
      description:
        "Superconductivity promises to transform everything from power grids to personal electronics.",
      url: "https://www.sciencealert.com/physicists-identify-a-strange-new-form-of-superconductivity",
      urlToImage:
        "https://www.sciencealert.com/images/2023/08/CoolSuperconductor.jpg",
      publishedAt: "2023-08-20T12:31:15Z",
      content:
        "Superconductivity promises to transform everything from power grids to personal electronics. Yet getting the low-waste form of power to operate at ambient temperatures and pressures is proving to be … [+2952 chars]",
    },
    {
      source: { id: null, name: "CNBC" },
      author: "Brian Evans",
      title:
        "Here's the trade on Nvidia ahead of earnings, according to analysts - CNBC",
      description:
        "Ahead of earnings Wednesday, analysts are weighing in on the forthcoming report and how to trade the earnings.",
      url: "https://www.cnbc.com/2023/08/20/heres-the-trade-on-nvidia-ahead-of-earnings-according-to-analysts.html",
      urlToImage:
        "https://image.cnbcfm.com/api/v1/image/105398954-1534357352806rts1xdsi.jpg?v=1692533518&w=1920&h=1080",
      publishedAt: "2023-08-20T12:11:58Z",
      content: null,
    },
    {
      source: { id: null, name: "MLSsoccer.com" },
      author: "mlssoccer",
      title:
        "Lionel Messi & Inter Miami: How they achieved Leagues Cup glory | MLSSoccer.com - MLSsoccer.com",
      description:
        "Seven games into his Inter Miami CF career, Lionel Messi has lifted silverware with his new club.",
      url: "https://www.mlssoccer.com/news/lionel-messi-inter-miami-how-they-achieved-leagues-cup-glory",
      urlToImage:
        "https://images.mlssoccer.com/image/private/t_q-best/prd-league/svzewujdpgfkzepmjwo4.jpg",
      publishedAt: "2023-08-20T12:01:56Z",
      content: null,
    },
    {
      source: { id: "cnn", name: "CNN" },
      author: "",
      title:
        "Video: Trump campaign demands apology from DeSantis over 'listless vessels' comment - CNN",
      description:
        "Former President Donald Trump’s campaign criticized Trump’s 2024 Republican opponent Gov. Ron DeSantis for calling Trump-supporting members of Congress “listless vessels.”",
      url: "https://www.cnn.com/videos/politics/2023/08/20/listless-vessels-ron-desantis-comment-trump-sot-cnntmw-vpx.cnn",
      urlToImage:
        "https://media.cnn.com/api/v1/images/stellar/prod/230701193027-desantis-trump-split-070123.jpg?c=16x9&q=w_800,c_fill",
      publishedAt: "2023-08-20T11:42:29Z",
      content: null,
    },
    {
      source: { id: null, name: "POLITICO.eu" },
      author: "Antoaneta Roussi",
      title:
        "Zelenskyy vows revenge after ‘terrorist’ missile strike on city center - POLITICO Europe",
      description:
        "Ukraine leader travels on Sunday to the Netherlands, which is set to send F-16 jets to Kyiv.",
      url: "https://www.politico.eu/article/volodymyr-zelenskyy-ukraine-vows-revenge-after-terrorist-missile-strike-on-city-center/",
      urlToImage:
        "https://www.politico.eu/cdn-cgi/image/width=1200,height=630,fit=crop,quality=80,onerror=redirect/wp-content/uploads/2023/08/20/GettyImages-1527761277-scaled.jpg",
      publishedAt: "2023-08-20T11:02:00Z",
      content:
        "Ukrainian President Volodymyr Zelenskyy promised retaliation for a Russian missile attack on Saturday that killed seven people including a six-year-old girl.\r\nThe missile hit the city center of Chern… [+1451 chars]",
    },
    {
      source: { id: "politico", name: "Politico" },
      author: null,
      title:
        "The Bucks county commission race will tell us which party will has the upper hand in 2024 - POLITICO - POLITICO",
      description: '"As Bucks County goes, Pennsylvania will go."',
      url: "https://www.politico.com/news/2023/08/20/bucks-county-pennsylvania-2024-00111933",
      urlToImage:
        "https://static.politico.com/49/73/3816f40e4a5396e6be4a4da53b0e/230818-bob-harvie-politico.jpg",
      publishedAt: "2023-08-20T11:00:00Z",
      content:
        "This year it is home to a local race that has the hallmarks of a race for national office: Candidates sparring over book bans in schools, crime and public safety, and the security of democracy in the… [+7208 chars]",
    },
    {
      source: { id: null, name: "INSIDER" },
      author: "Maria Noyen",
      title:
        "Britney Spears says Sam Asghari divorce is 'nobody's business' - Insider",
      description:
        'Sam Asghari filed for divorce from Britney Spears on Wednesday, citing "irreconcilable differences" after 14 months of marriage.',
      url: "https://www.insider.com/britney-spears-sam-asghari-divorce-shocked-nobodys-business-2023-8",
      urlToImage:
        "https://i.insider.com/64e1da9abd98a600197a3945?width=1200&format=jpeg",
      publishedAt: "2023-08-20T10:51:00Z",
      content:
        "Britney Spears said she's \"shocked\" by Sam Asghari's decision to file for divorce earlier this week.\r\nThe pop star broke her silence on the divorce, which comes just 14 months after the couple tied t… [+2303 chars]",
    },
    {
      source: { id: "reuters", name: "Reuters" },
      author: "Reuters",
      title:
        "As fires rage in British Columbia, more residents prepare for evacuations - Reuters Canada",
      description:
        "Record-setting wildfires in Canada's western province of British Columbia are expected to push more people out of their homes this week, as firefighters battle unruly blazes that have destroyed properties and closed parts of a major national highway.",
      url: "https://www.reuters.com/world/americas/fires-rage-british-columbia-more-residents-prepare-evacuations-2023-08-20/",
      urlToImage:
        "https://www.reuters.com/resizer/XL5oPyihb0TS3U7pePTex9XbxUI=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/ONKH6XOJNZJIJBEKHWLNNLUNAA.jpg",
      publishedAt: "2023-08-20T10:05:39Z",
      content:
        "Aug 20 (Reuters) - Record-setting wildfires in Canada's western province of British Columbia are expected to push more people out of their homes this week, as firefighters battle unruly blazes that h… [+3392 chars]",
    },
    {
      source: { id: null, name: "New York Post" },
      author: "Fox News",
      title:
        "Florida officials report five deaths from 'flesh-eating' bacteria in Tampa Bay since January - New York Post ",
      description:
        "According to Florida Health, the vibrio vulnificus bacterium’s natural habitat is in warm, brackish seawater because it requires salt to live.",
      url: "https://nypost.com/2023/08/20/florida-reports-five-deaths-from-flesh-eating-bacteria-in-tampa-bay-since-january/",
      urlToImage:
        "https://nypost.com/wp-content/uploads/sites/2/2023/08/newspress-collage-kbqv6bzw7-1692521530672.jpg?quality=75&strip=all&1692507158&w=1024",
      publishedAt: "2023-08-20T09:15:00Z",
      content:
        "Five people are confirmed dead in the Tampa Bay area because of a flesh-eating bacterium known to lurk at beaches, Florida officials reported.\r\nAccording to Florida Health, the vibrio vulnificus bact… [+3214 chars]",
    },
    {
      source: { id: null, name: "WTOP" },
      author: "Kate Corliss",
      title:
        "Malaria in Maryland: How health officials say you can protect yourself from mosquitoes - WTOP",
      description:
        "The Prince George’s County Health Department is advising residents on how to steer clear of mosquito bites, following Maryland’s first locally acquired malaria case in more than 40 years.",
      url: "https://wtop.com/prince-georges-county/2023/08/malaria-in-maryland-how-health-officials-say-you-can-protect-yourself-from-mosquitoes/",
      urlToImage:
        "https://wtop.com/wp-content/uploads/2023/05/MOSQUITO.GettyImages-1034036804-e1692473626523.jpg",
      publishedAt: "2023-08-20T08:35:01Z",
      content:
        "The Prince George’s County Health Department is advising residents on how to steer clear of mosquito bites, following the announcement of Maryland’s first locally acquired malaria case in more than 4… [+2648 chars]",
    },
    {
      source: { id: "cnn", name: "CNN" },
      author: "Nouran Salahieh, Gene Norman",
      title:
        "Category 1 Hurricane Hilary barrels toward California, still threatening floods and damaging winds - CNN",
      description:
        "Hurricane Hilary is expected to slam into Southern California on Sunday as a rare tropical storm, unleashing floods, fierce winds and heavy downpours as residents evacuate, parks and beaches close and first responders brace for water rescues.",
      url: "https://www.cnn.com/2023/08/20/weather/hurricane-hilary-california-southwest-tropical-storm-sunday/index.html",
      urlToImage:
        "https://media.cnn.com/api/v1/images/stellar/prod/230820003147-02-hurricane-hilary-0820-satellite.jpg?c=16x9&q=w_800,c_fill",
      publishedAt: "2023-08-20T07:53:00Z",
      content:
        "Hurricane Hilary is expected to slam into Southern California on Sunday as a rare tropical storm, unleashing floods, fierce winds and heavy downpours as residents evacuate, parks and beaches close an… [+6300 chars]",
    },
    {
      source: { id: null, name: "Netcarshow.com" },
      author: null,
      title:
        "Lotus Type 66 (2024) - pictures, information & specs - NetCarShow.com",
      description:
        "Lotus Type 66 has benefitted from more than half a century of technical progress since it was imagined to optimise its design, engineering and manufacture.",
      url: "https://www.netcarshow.com/lotus/2024-type_66/",
      urlToImage: "https://www.netcarshow.com/Lotus-Type_66-2024-wallpaper.jpg",
      publishedAt: "2023-08-20T07:14:49Z",
      content:
        "Lotus has brought history back to life with the world premiere of the Type 66 - and confirmed the stunning track-only car will go into production.\r\nThis unique project was unveiled at 'The Quail, A M… [+6959 chars]",
    },
    {
      source: { id: null, name: "YouTube" },
      author: null,
      title: "Sean O’Malley KOs Aljamain Sterling at UFC 292 - UFC",
      description:
        "Watch Sean O'Malley's TKO finish of Aljamain Sterling. OFFICIAL UFC 292 RESULTS 👉 https://ufc.ac/45qj93kSubscribe to get all the latest UFC content: http://...",
      url: "https://www.youtube.com/watch?v=eY5cZITcrF4",
      urlToImage: "https://i.ytimg.com/vi/eY5cZITcrF4/maxresdefault.jpg",
      publishedAt: "2023-08-20T05:54:27Z",
      content: null,
    },
    {
      source: { id: null, name: "CNET" },
      author: null,
      title:
        "Spain vs. England: How to Watch FIFA Women's World Cup 2023 Final Live From Anywhere - CNET",
      description:
        "The 2023 Women's World Cup final between Spain and England kicks off early Sunday morning in the US.",
      url: "https://www.cnet.com/tech/services-and-software/spain-vs-england-how-to-watch-fifa-womens-world-cup-2023-final-live-from-anywhere/",
      urlToImage:
        "https://www.cnet.com/a/img/resize/8f169f5dd3fd99280bc7e964cbe7c9f517bb3bdf/hub/2023/07/19/0f0f9586-82a0-4a3e-aae9-0c5e2138b440/gettyimages-1244135696.jpg?auto=webp&fit=crop&height=675&width=1200",
      publishedAt: "2023-08-20T05:00:00Z",
      content:
        "There will be a first-time World Cup winner in 2023. Spain will meet England in the Women's World Cup final with both squads hoping to bring home their first World Cup. \r\nEngland is expected to be th… [+17117 chars]",
    },
  ];
  constructor() {
    super();
    console.log("I'm constructor of news");

    this.state = {
      articles: this.articles,
      loading: false,
    };
  }
  render() {
    return (
      <div className="container">
        <h2>News Fire! - Daily News</h2>
        <div className="row">
          {this.state.articles.map((e) => {
            return (
              <div key={e.url} className="col-md-4">
                <NewsItem
                  title={e.title.slice(0, 45)}
                  desc={e.description.slice(0, 80)}
                  url={e.urlToImage}
                  newsUrl={e.url}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

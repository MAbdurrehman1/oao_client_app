import { type KPI } from '@/types'

export interface FocusAreaProps {
  name: KPI
  content: string
  subAreas: FocusSubAreaProps[]
}

interface FocusSubAreaProps {
  title: string
  description?: string
  items: SubAreaItemProps[]
}

interface SubAreaItemProps {
  name: string
  content: string
}

const content = `Now that you have understood the reasons for your low Guidance score, let’s see what you can do about it – how you can tackle the roadblocks your teams face. 

Below, I have extracted key insights from your Guidance data to highlight the most critical areas for your attention. There are 3 things to focus on as of now – you can always have a look at those while we have our discussion. 

I will help you develop actions you can take: I can share with you what other companies in a similar position did or what academia suggests – this should be valuable input for you to prioritize an action. Let’s move to the chat on the right and have a discussion on your one or all of your key focus areas. `

export const items: FocusAreaProps[] = [
  {
    name: 'readiness',
    content,
    subAreas: [
      {
        title: 'Key Focus Areas',
        items: [
          {
            name: 'Growing Frustration Amid Rising Urgency and Impatience',
            content:
              'The majority of your people are not aware of the vision, but those who are find it actionable –  impacting their decision-making. ',
          },
          {
            name: 'Common Pattern of Road-blocks',
            content:
              'Your teams question the composition of your leadership, especially the mix of expertise it brings. People will only follow your leaders if they are convinced of them across all areas. ​',
          },
        ],
      },
    ],
  },
  {
    name: 'guidance',
    content,
    subAreas: [
      {
        title: 'Key Focus Areas',
        items: [
          {
            name: 'Data & AI vision is unknown but actionable',
            content:
              'The majority of your people are not aware of the vision, but those who are find it actionable –  impacting their decision-making. ',
          },
          {
            name: 'Lack of data &AI expertise in your leadership',
            content:
              'Your teams question the composition of your leadership, especially the mix of expertise it brings. People will only follow your leaders if they are convinced of them across all areas. ​',
          },
        ],
      },
    ],
  },
  {
    name: 'execution',
    content,
    subAreas: [
      {
        title: 'Key Focus Areas',
        items: [
          {
            name: 'Your teams are operating at 2 speeds',
            content:
              'The majority of your people are not aware of the vision, but those who are find it actionable –  impacting their decision-making. ',
          },
          {
            name: 'Pipeline is saturated',
            content:
              'Your teams question the composition of your leadership, especially the mix of expertise it brings. People will only follow your leaders if they are convinced of them across all areas. ​',
          },
        ],
      },
    ],
  },
]

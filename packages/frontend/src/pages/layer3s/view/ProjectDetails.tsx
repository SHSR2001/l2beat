import { assertUnreachable } from '@l2beat/shared-pure'
import React from 'react'

import { DescriptionSection } from '../../../components/project/DescriptionSection'
import { KnowledgeNuggetsSection } from '../../../components/project/KnowledgeNuggetsSection'
import { ContractsSection } from '../../../components/project/ContractsSection'
import { MilestonesSection } from '../../../components/project/MilestonesSection'
import { TechnologyIncompleteProps } from '../../../components/project/TechnologyIncomplete'
import { UpcomingDisclaimer } from '../../../components/project/UpcomingDisclaimer'
import { ScalingDetailsItem } from '../props/getProjectDetails'


export interface ProjectDetailsProps {
  isUpcoming?: boolean
  items: ScalingDetailsItem[]
  incomplete?: TechnologyIncompleteProps
}

export function ProjectDetails(props: ProjectDetailsProps) {
  return (
    <div className="px-4 md:px-0">
      {props.items.map((item, index) => {
        switch (item.type) {
          case 'MilestonesSection':
            return <MilestonesSection key={item.props.id} {...item.props} />
          case 'KnowledgeNuggetsSection':
            return (
              <KnowledgeNuggetsSection key={item.props.id} {...item.props} />
            )
          case 'ContractsSection':
            return <ContractsSection key={item.props.id} {...item.props} />
          case 'DescriptionSection':
            return <DescriptionSection key={item.props.id} {...item.props} />
          case 'UpcomingDisclaimer':
            return (
              <UpcomingDisclaimer
                key={`${item.type}${index}`}
                className="mt-6"
              />
            )
          default:
            assertUnreachable(item)
        }
      })}
    </div>
  )
}

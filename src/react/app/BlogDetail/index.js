import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { GithubFlavoredMarkdown } from '../../components/GithubFlavoredMarkdown'

import { actions } from './actions'
import { parseJekyllPost } from './selectors'

const mapStateToProps = (store, ownProps) => {
  const { attributes, body } = parseJekyllPost(store, ownProps)
  return {
    frontMatters: attributes,
    content: body,
  }
}

const mapDispatchToProps = {
  fetchBlogDetail: actions.fetchBlogDetail,
}

export class BlogDetailOnlyForTesting extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }),
    frontMatters: PropTypes.object,
    content: PropTypes.string,
    fetchBlogDetail: PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchBlogDetail(this.props.match.params.id)
  }

  get title() {
    const { title } = this.props.frontMatters
    return title ? `# ${title.trim()}` : ''
  }

  get summary() {
    const { summary } = this.props.frontMatters
    if (!summary) {
      return ''
    }

    const trimmedSummary = summary.trim()
    const maxLength = 150
    return trimmedSummary.length > maxLength
      ? `> ${trimmedSummary.substring(0, maxLength)}...`
      : `> ${trimmedSummary}`
  }

  render() {
    return (
      <div className="container">
        <If condition={this.title}>
          <GithubFlavoredMarkdown data={this.title} />
        </If>
        <If condition={this.summary}>
          <GithubFlavoredMarkdown data={this.summary} />
        </If>
        <If condition={this.props.content}>
          <GithubFlavoredMarkdown data={this.props.content} />
        </If>
      </div>
    )
  }
}

export const BlogDetail = connect(mapStateToProps, mapDispatchToProps)(
  BlogDetailOnlyForTesting
)

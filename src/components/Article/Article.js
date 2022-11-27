import React from 'react'
import PropTypes from 'prop-types'
import classes from './Article.module.scss'
import AuthorCard from '../AuthorCard'
import TagList from '../TagList'
import LikeBtn from '../LkeBtn'

const Article = ({ author, text, created, title, tagList, likes, slug, favorited, isAuthorized }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h1>{title}</h1>
          <LikeBtn
            slug={slug}
            favorited={favorited}
            likes={likes}
            isAuthorized={isAuthorized}
          />
        </div>
        <TagList tagList={tagList} />
        <div className={classes.text}>{text}</div>
      </div>

      <div className={classes.container}>
        <AuthorCard
          created={created}
          author={author}
        />
      </div>
    </div>
  )
}

Article.defaultProps = {
  author: {},
  text: '',
  created: '',
  title: '',
  tagList: [],
  likes: 0,
  slug: '',
  favorited: false,
  isAuthorized: false,
}

Article.propTypes = {
  author: PropTypes.shape(),
  text: PropTypes.string,
  created: PropTypes.string,
  title: PropTypes.string,
  tagList: PropTypes.arrayOf(PropTypes.string),
  likes: PropTypes.number,
  slug: PropTypes.string,
  favorited: PropTypes.bool,
  isAuthorized: PropTypes.bool,
}

export default Article

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classes from './Article.module.scss'
import AuthorCard from '../AuthorCard'
import TagList from '../TagList'
import LikeBtn from '../LkeBtn'

const Article = ({ author, description, created, title, tagList, likes, slug, favorited, isAuthorized, full }) => {
  useEffect(() => {}, [isAuthorized])
  const link = full ? (
    <h1>{title}</h1>
  ) : (
    <Link
      key={slug}
      to={`articles/${slug}`}
    >
      <h1>{title}</h1>
    </Link>
  )
  return (
    <div className={full ? classes.full : classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.title}>
          {link}
          <LikeBtn
            slug={slug}
            favorited={favorited}
            likes={likes}
            isAuthorized={isAuthorized}
          />
        </div>
        <TagList tagList={tagList} />

        <div className={full ? classes.descr_full : classes.descr}>{description}</div>
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
  description: '',
  created: '',
  title: '',
  tagList: [],
  likes: 0,
  slug: '',
  favorited: false,
  isAuthorized: false,
  full: false,
}

Article.propTypes = {
  author: PropTypes.shape(),
  description: PropTypes.string,
  created: PropTypes.string,
  title: PropTypes.string,
  tagList: PropTypes.arrayOf(PropTypes.string),
  likes: PropTypes.number,
  slug: PropTypes.string,
  favorited: PropTypes.bool,
  isAuthorized: PropTypes.bool,
  full: PropTypes.bool,
}

export default Article

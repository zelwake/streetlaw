const ContentStyle = () => {
  return (
    <style>{`
    .news-info {
        margin: 16px;
    }

    .news-info h1 {
      font-size: 28px;
      line-height: 1.4;
      font-weight: 700;
      margin-top: 19px;
      margin-bottom: 19px;
    }

    .news-info h2 {
      font-size: 22px;
      line-height: 1.4;
      font-weight: 700;
      margin-top: 19px;
      margin-bottom: 19px;
    }

    .news-info h3 {
      font-size: 16px;
      line-height: 1.4;
      font-weight: 700;
      margin-top: 19px;
      margin-bottom: 19px;
    }

    .news-info h4 {
      font-size: 14px;
      line-height: 1.4;
      font-weight: 700;
      margin-top: 21px;
      margin-bottom: 21px;
    }

    .news-info h5 {
      font-size: 12px;
      line-height: 1.4;
      font-weight: 700;
      margin-top: 21px;
      margin-bottom: 21px;
    }

    .news-info h6 {
      font-size: 10px;
      line-height: 1.4;
      font-weight: 700;
      margin-top: 21px;
      margin-bottom: 21px;
    }

    .news-info p {
      font-size: 16px;
      line-height: 20px;
      margin-top: 14px;
      margin-bottom: 14px;
    }

    .news-info blockquote {
      font-size: 16px;
      line-height: 1.4;
      border-left: 2px solid #ccc;
      margin-left: 24px;
      padding-left: 16px;
    }

    .news-info ul, .news-info ol {
      margin-top: 14px;
      margin-bottom: 14px;
      padding-left: 40px;
      font-size: 16px;
      line-height: 1.4;
    }

    .news-info ul {
      list-style: disc;
    }

    .news-info ol {
      list-style: decimal;
    }

    .news-info a {
      color: #0066CC;
      text-decoration: underline;
    }
  `}</style>
  )
}

export default ContentStyle

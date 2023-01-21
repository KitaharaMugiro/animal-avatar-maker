def call_api(secret, query):
  import requests
  # urlを設定
  url = f"https://main-airedale-23.hasura.app/v1/graphql"

  # headersを設定
  # 重要: Content-typeはapplication/graphqlではなくapplication/jsonじゃないと動かない
  headers = {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": secret,
  }

  # requestする
  response = requests.post(
      url,
      json={"query": query},
      headers=headers
  )
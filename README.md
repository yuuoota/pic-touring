# README

# アプリ名

## Pic-Touring
<br>

# 概要
バイク乗り用SNSを目標とした、写真投稿アプリです。

# 本番環境
### URL
https://pic-touring.herokuapp.com/  
### テスト用アカウント  
Email : sample1@sample1.com  
Password : sample1

# 開発環境
### バックエンド
ruby 2.6.5 / Rails 6.0.4.6
### フロントエンド
html / css / Javascript / JQuery / Ajax
### データベース
MySQL / SequelPro
### インフラ
AWS(EC2)
### ソース管理
GitHub / GitHubDesktop
### エディタ
VSCode

 
# テーブル設計

## Users

|Column            |Type  |Options                  |
|------------------|------|-------------------------|
|nickname          |string|null: false              |
|email             |string|null: false, unique: true|
|encrypted_password|string|null: false              |

### Association
- has_many :posts

## Posts

|Column         |Type       |Options                       |
|---------------|-----------|------------------------------|
|text           |text       |null: false                   |
|user           |references |null: false, foreign_key: true|

### Association
- belongs_to :user
- has_many :post_spot_relations
- has_many :spots, through: :post_spot_relations

## Spots

|Column    |Type      |Options     |
|----------|----------|------------|
|spot_name |text      |null: false |

### Association
- has_many :post_spot_relations
- has_many :posts, through: :post_spot_relations

## Post_spot_relations

|Column        |Type      |Options                       |
|--------------|----------|------------------------------|
|post          |references|null: false, foreign_key: true|
|spot          |references|null: false, foreign_key: true|

### Association
- belongs_to :post
- belongs_to :spot

## Comments

|Column        |Type      |Options                       |
|--------------|----------|------------------------------|
|text          |text      |null: false                   |
|user          |references|null: false, foreign_key: true|
|post          |references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :post


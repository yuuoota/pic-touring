# README

# Pic-Touring
 
# 概要
 
ツーリングしたときに撮影した写真を投稿することができます。
投稿した写真には位置情報をつけておくとより便利です。アプリで投稿した写真を開くと撮影した位置がマップ上に自動で表示されます。
 
# 開発環境
 
ruby 2.6.5
Rails 6.0.4.6
 
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


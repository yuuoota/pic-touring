# README

# アプリ名

### Pic-Touring

# 概要

バイク乗りのための、SNS機能やバイクのメンテナンス管理ができるアプリを目標として、勉強しながらコツコツと開発しています。(現在はSNS機能のみです)

[![Image from Gyazo](https://i.gyazo.com/1590a68b579b37d6eaeea091f33d62ea.png)](https://gyazo.com/1590a68b579b37d6eaeea091f33d62ea)

# 本番環境
### ◆URL
https://pic-touring.herokuapp.com/  
### ◆ログイン用アカウント  
Email : sample1@sample1.com  
Password : sample1

# 制作背景
ツーリングに行くと、ふとした時に名もない道で写真を撮影することが頻繁にあります。後で見返したときに写真の場所が一目でわかるような形で記録し、他のライダーと共有できるアプリがあればという思いで開発を始めました。
# DEMO
## ◆トップページ

[![Image from Gyazo](https://i.gyazo.com/8359c84b581748bcc2a833dc05361eaf.gif)](https://gyazo.com/8359c84b581748bcc2a833dc05361eaf)

投稿写真が一覧で表示されます。また、ハッシュタグを検索できます。検索欄に文字を入力するとDBに保存されているハッシュタグがインクリメンタルサーチされます。
## ◆写真投稿画面

[![Image from Gyazo](https://i.gyazo.com/f6e5936a68440fa171ca2528fe1ef783.gif)](https://gyazo.com/f6e5936a68440fa171ca2528fe1ef783)

コメント入力、写真選択(最大5枚)、ハッシュタグの入力をして投稿できます。投稿に成功すると、１枚目の写真がトップページに表示されます。
## ◆詳細画面

[![Image from Gyazo](https://i.gyazo.com/eecc9b602687ecd28c9ad888cc319e2d.gif)](https://gyazo.com/eecc9b602687ecd28c9ad888cc319e2d)

トップページで写真をクリックすると、詳細画面に遷移します。投稿写真に位置情報が含まれていれば、その位置が地図上にマーカーで表示されます。写真とマーカーはそれぞれ対応しており、写真の撮影位置が一目でわかるようになっています。
#### ●ハッシュタグ機能

[![Image from Gyazo](https://i.gyazo.com/6776af6c0403ba4a7ba35aefa9ae7243.gif)](https://gyazo.com/6776af6c0403ba4a7ba35aefa9ae7243)

投稿写真に位置情報が含まれない場合は、ハッシュタグをジオコーディングした結果が地図上にマーカーで表示されるようになっています。
ハッシュタグをクリックすると、同じハッシュタグの投稿写真が表示されます
#### ●コメント機能

[![Image from Gyazo](https://i.gyazo.com/41fb8433024c12a5be4878f8a16ec963.gif)](https://gyazo.com/41fb8433024c12a5be4878f8a16ec963)
#### ●編集機能

[![Image from Gyazo](https://i.gyazo.com/3ebb48f1a3b010cd38d9d36ac4074b6d.gif)](https://gyazo.com/3ebb48f1a3b010cd38d9d36ac4074b6d)

編集画面にて、画像を選択しないまま保存した場合、画像は元のままで変更されない仕様になっています。 

# 今後実装したい機能
- SNS機能とは別に、エンジンオイルやフィルターの交換といった定期的に必要なメンテナンスの記録、管理をする機能
- スマートフォンやタブレットでの利用を想定しているため、レスポンシブデザインの実装
<br>
<br>
◇レスポンシブデザインのイメージ◇

[![Image from Gyazo](https://i.gyazo.com/1de30d530c5405394bcd0e0f0608040f.gif)](https://gyazo.com/1de30d530c5405394bcd0e0f0608040f)

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


# React & Django ToDo Application

これは、フロントエンドにReact、バックエンドにDjangoを使用したフルスタックのToDoアプリケーションです。

基本的なCRUD（作成、読み取り、更新、削除）機能に加え、Material-UIによるモダンなUIと、アイテム追加・削除時のアニメーションが実装されています。

## 主な使用技術

- **フロントエンド**: React, Material-UI (MUI)
- **バックエンド**: Python, Django, Django Rest Framework
- **データベース**: SQLite3 (開発用)

---

## 前提条件

このアプリケーションを実行するには、以下のソフトウェアがインストールされている必要があります。

- [Node.js](https://nodejs.org/) (npmも同時にインストールされます)
- [Python](https://www.python.org/) (pipも同時にインストールされます)
- [Git](https://git-scm.com/)

---

## セットアップと実行方法

### 1. プロジェクトのクローン

まず、このリポジトリをあなたのローカルマシンにクローン（ダウンロード）します。

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
cd YOUR_REPOSITORY_NAME
```
*(注意: 上記URLは、あなた自身のリポジトリのURLに置き換えてください)*

### 2. バックエンド (Django) のセットアップと起動

バックエンドサーバーを起動します。

**a. 仮想環境の作成と有効化**

```bash
# Pythonで仮想環境を作成
python -m venv venv

# 仮想環境を有効化 (Windowsの場合)
.\venv\Scripts\activate

# (macOS / Linux の場合)
# source venv/bin/activate
```

**b. 依存パッケージのインストール**

```bash
# requirements.txt を使って、必要なPythonパッケージをすべてインストール
pip install -r requirements.txt
```

**c. データベースのセットアップ**

```bash
# backendディレクトリに移動
cd backend

# データベースの初期設定
python manage.py migrate
```

**d. バックエンドサーバーの起動**

```bash
# 開発サーバーを起動
python manage.py runserver
```

これで、バックエンドサーバーが `http://localhost:8000` で起動します。このターミナルは開いたままにしておいてください。

### 3. フロントエンド (React) のセットアップと起動

**新しいターミナルを開いて**、以下の手順を実行します。

**a. フロントエンドディレクトリへの移動**

```bash
# プロジェクトのルートディレクトリから実行
cd frontend
```

**b. 依存パッケージのインストール**

```bash
# package.json を基に、必要なライブラリをすべてインストール
npm install
```

**c. フロントエンドサーバーの起動**

```bash
# 開発サーバーを起動
npm start
```

自動的にブラウザで `http://localhost:3000` が開き、ToDoアプリケーションが表示されます。

バックエンドとフロントエンドの両方のサーバーが起動している状態で、すべての機能が利用可能です。

# RSS Feed Reader

Web application for managing and reading RSS feeds/

## Features

- **Feed Management**

  - Add new RSS feeds
  - Remove existing feeds
  - Toggle feed visibility
  - Click on feed URL to show only that feed's articles
  - Use Show/Hide buttons to toggle individual feed visibility

- **Article Management**

  - View articles from all visible feeds
  - Search through articles
  - Mark articles as read
  - Preview article content
  - Open full article in new tab

- **User Experience**
  - Loading indicators
  - Error notifications
  - Persistent storage (feeds and read articles are saved locally)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository:

```bash
git clone git@github.com:paw-get/rss-app.git
cd rss-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Testing

The application includes comprehensive test coverage using Vitest and React Testing Library.

### Running Tests

To run the tests:

```bash
npx vitest
```

The tests cover:

- Component rendering and behavior
- User interactions
- Feed visibility toggling

## Usage

### Adding Feeds

1. Enter the RSS feed URL in the input field at the top of the page
2. Click "Add RSS feed" or press Enter
3. The feed will be added to your list if valid

### Managing Feeds

- Click on a feed's URL to show only that feed's articles
- Use the Show/Hide button to toggle individual feed visibility
- Use the Remove button to delete a feed and its articles

### Reading Articles

- Click on an article to preview its content
- Use the search bar to filter articles by title
- Click "Read whole article" to open the full article in a new tab
- Articles are automatically marked as read when opened

## Technical Details

- Built with React and Vite
- Uses Semantic UI for styling
- Implements local storage for data persistence
- Uses a CORS proxy for fetching RSS feeds
- Implements debounced search for better performance
- Comprehensive test suite using Vitest and React Testing Library

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License.

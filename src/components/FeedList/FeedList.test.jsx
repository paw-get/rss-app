import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FeedList from './FeedList';

describe('FeedList', () => {
  const mockFeeds = [
    { url: 'https://example.com/rss', visible: true },
    { url: 'https://nasa.gov/rss', visible: false },
  ];

  const onRemoveFeed = vi.fn();
  const onToggleVisibility = vi.fn();
  const onFocusFeed = vi.fn();

  it('renders all feeds with visibility buttons', () => {
    render(
      <FeedList
        feeds={mockFeeds}
        onRemoveFeed={onRemoveFeed}
        onToggleVisibility={onToggleVisibility}
        onFocusFeed={onFocusFeed}
        focusedFeedUrl={null}
      />
    );

    expect(screen.getByText('https://example.com/rss')).toBeInTheDocument();
    expect(screen.getByText('https://nasa.gov/rss')).toBeInTheDocument();
    expect(screen.getByText('Hide')).toBeInTheDocument();
    expect(screen.getByText('Show')).toBeInTheDocument();
  });

  it('toggles feed visibility when button clicked', async () => {
    render(
      <FeedList
        feeds={mockFeeds}
        onRemoveFeed={onRemoveFeed}
        onToggleVisibility={onToggleVisibility}
        onFocusFeed={onFocusFeed}
        focusedFeedUrl={null}
      />
    );

    await userEvent.click(screen.getByText('Hide'));
    expect(onToggleVisibility).toHaveBeenCalledWith('https://example.com/rss');
  });
});

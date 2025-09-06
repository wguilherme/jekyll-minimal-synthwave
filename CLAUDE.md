# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `make setup` - Installs Bundler 2.2.34 and required gems
- `make up` - Runs setup and starts Jekyll development server at http://localhost:4000
- `bundle install` - Installs gem dependencies
- `bundle exec jekyll serve` - Starts Jekyll development server manually
- `gem build minimal-synthwave.gemspec` - Builds the gem
- `gem install minimal-synthwave-*.gem` - Installs built gem locally

## Architecture

This is a minimalist Jekyll theme gem with synthwave/hacker aesthetics. The codebase follows Jekyll theme conventions:

### Core Structure
- `_layouts/` - HTML templates (default, home, post, page, archive)
- `_includes/` - Reusable HTML components (head, menu_item, post_list, back_link, synthwave-grid)
- `_sass/` - SCSS stylesheets (minimalist-synthwave.scss, minimalist-hacker.scss)
- `assets/js/` - JavaScript files (synthwave-grid.js for animated background)

### Configuration & Content
- `_config.yml` - Site configuration with theme_config section for style ("hacker" or "synthwave"), appearance modes, and customization
- `_data/menu.yml` - Navigation menu structure with support for nested entries and post lists
- `_posts/` - Example blog posts demonstrating theme features

### Theme Variants
The theme supports two visual styles configured via `theme_config.style`:
- "hacker" - Matrix-style green terminal aesthetic 
- "synthwave" - Neon purple/pink retro aesthetic

### Key Features
- Ultra-lightweight (1KB CSS)
- Dark/light/auto appearance modes
- Responsive design optimized for readability
- SEO optimization with jekyll-seo-tag
- RSS feeds with jekyll-feed
- Animated grid backgrounds for synthwave style
- Menu system supporting nested entries and post filtering by category

### Ruby Version
Uses Ruby 3.3.4 as specified in `.tool-versions` (managed with ASDF)
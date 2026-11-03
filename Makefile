# ZPlay Slot Suite - Makefile
# Commands for building, running, and managing the slot game suite

.PHONY: help install build dev start clean test lint validate-template deploy deploy-vercel deploy-netlify deploy-ghpages

# Default target
help: ## Show available make targets
	@echo "ZPlay Slot Suite - Available Commands:"
	@echo ""
	@awk 'BEGIN {FS = ":.*##"; printf "  \033[36m%-20s\033[0m %s\n", "target", "description"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

# ------------------------------------------------------------
# Template validation
# ------------------------------------------------------------
validate-template: ## Validate repository structure and Markdown links per ztemplate
	python3 scripts/validate_repo.py

# ------------------------------------------------------------
# Setup
# ------------------------------------------------------------
install: ## Install npm dependencies
	npm install

# ------------------------------------------------------------
# Build & Run
# ------------------------------------------------------------
build: ## Build the project for production
	npm run build

dev: ## Start development server with hot reload
	npm run dev

start: build ## Build and start production preview server
	npm run preview

# ------------------------------------------------------------
# Clean
# ------------------------------------------------------------
clean: ## Remove build output and node_modules
	rm -rf dist
	rm -rf node_modules
	rm -f package-lock.json

clean-build: ## Remove only build output
	rm -rf dist

# ------------------------------------------------------------
# Deploy
# ------------------------------------------------------------
deploy-vercel: build ## Deploy to Vercel
	npx vercel --prod

deploy-netlify: build ## Deploy to Netlify
	npx netlify deploy --prod --dir=dist

deploy-ghpages: build ## Deploy to GitHub Pages
	npx gh-pages -d dist

deploy: build ## Build for deployment (output in dist/)
	@echo "Build complete. Static files are in dist/"
	@echo "Deploy dist/ to any static host (Vercel, Netlify, GitHub Pages, S3, etc.)"

# ------------------------------------------------------------
# Quick start (install + build + preview)
# ------------------------------------------------------------
quickstart: install build start ## Install, build, and start preview server

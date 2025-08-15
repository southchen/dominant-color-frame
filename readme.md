# Dominant Color Frame

> A pure front-end web application that frames images with their dominant color using FileReader & Canvas Web API

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://southchen.github.io/dominant-color-frame/)

![Screenshot](public/screen%20shot.png)

## Overview

This tool solves a common problem for photographers and content creators: maintaining visual consistency when uploading images with different aspect ratios to social media platforms.

Instead of letting platforms crop your carefully composed photos, this app automatically frames them with a border using the image's dominant color, creating a cohesive and professional look.

## Problem Statement

When uploading photos with different aspect ratios (3:4, 16:9, etc.) and orientations to social media:
- Images appear misaligned in feeds
- Platforms may crop photos, destroying the original composition
- Visual consistency is lost across your content

## Solution

Frame each image with its dominant color to:
- ✨ Maintain original composition
- 🎨 Create visual harmony across different aspect ratios
- 📱 Ensure consistent appearance on social media feeds

## Features

- **Pure Frontend**: No server required, runs entirely in the browser
- **Vanilla JavaScript**: Minimal dependencies (only Semantic UI for styling)
- **Batch Processing**: Upload and process multiple images at once
- **Batch Download**: Download all processed images as a ZIP file
- **Shadow Toggle**: Optional drop shadow effect for enhanced visual appeal
- **Real-time Preview**: See results instantly as you upload

## Technical Implementation

- **FileReader API**: For client-side file handling
- **Canvas API**: For image processing and dominant color extraction
- **Promise-based**: Asynchronous file processing with proper error handling
- **Responsive Design**: Works on desktop and mobile devices

## Usage

1. Visit the [live demo](https://southchen.github.io/dominant-color-frame/)
2. Upload one or multiple images
3. Toggle shadow effect if desired
4. Download individual images or batch download all

## Example

![Example](public/Untitled%20Diagram.jpg)

*Before and after: Original photos with different aspect ratios transformed into consistently framed images*

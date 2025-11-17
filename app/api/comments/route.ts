import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

// Simple file-based storage for comments (in production, use a database)
const COMMENTS_FILE = join(process.cwd(), 'data', 'comments.json');

interface Comment {
  id: string;
  businessSlug: string;
  userId: string;
  userName: string;
  comment: string;
  createdAt: string;
}

function getComments(): Comment[] {
  try {
    if (existsSync(COMMENTS_FILE)) {
      const data = readFileSync(COMMENTS_FILE, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading comments:', error);
    return [];
  }
}

function saveComments(comments: Comment[]) {
  try {
    // Ensure data directory exists
    const { mkdirSync } = require('fs');
    const dataDir = join(process.cwd(), 'data');
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }
    writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving comments:', error);
  }
}

// GET - Fetch comments for a business
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const businessSlug = searchParams.get('businessSlug');

  if (!businessSlug) {
    return NextResponse.json(
      { error: 'Business slug is required' },
      { status: 400 }
    );
  }

  const comments = getComments();
  const businessComments = comments
    .filter(c => c.businessSlug === businessSlug)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json({ comments: businessComments });
}

// POST - Add a new comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessSlug, userId, userName, comment } = body;

    if (!businessSlug || !userId || !userName || !comment) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (comment.trim().length === 0) {
      return NextResponse.json(
        { error: 'Comment cannot be empty' },
        { status: 400 }
      );
    }

    const comments = getComments();
    const newComment: Comment = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      businessSlug,
      userId,
      userName,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    };

    comments.push(newComment);
    saveComments(comments);

    return NextResponse.json({ comment: newComment }, { status: 201 });
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json(
      { error: 'Failed to add comment' },
      { status: 500 }
    );
  }
}


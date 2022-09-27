import { render, screen } from '@testing-library/react';
import { debug } from 'console';
import { mocked } from 'jest-mock';
import { getSession, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import PostPreview, { getStaticProps } from '../../pages/posts/preview/[slug]';
import { getPrismicClient } from '../../services/prismic';

jest.mock('../../services/prismic')
jest.mock('next-auth/client')
jest.mock('next/router')

const post = { slug: 'my-new-post', title: 'My New Post', content: '<p>Post content</p>', updatedAt: '01 de Abril' };

describe('Post preview page', () => {
    it('renders correctly', () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([null, false])


        render(<PostPreview post={post} />)

        expect(screen.getByText("My New Post")).toBeInTheDocument()
        expect(screen.getByText("Post content")).toBeInTheDocument()
        expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument()
    })

    it('redirects user to full post when user is subscribed ', async () => {
        const getSessionMocked = mocked(useSession)
        const useRouterMocked = mocked(useRouter)
        const pushMock = jest.fn()

        getSessionMocked.mockReturnValueOnce([
            { activeSubscription: 'fake-active-subscription' },
            false
        ])

        useRouterMocked.mockReturnValueOnce({
            push: pushMock
        } as any)

        render(<PostPreview post={post} />)

        expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post')
    })

    it('loads initial data', async () => {
        const getPrismicClientMocked = mocked(getPrismicClient)

        getPrismicClientMocked.mockReturnValueOnce({
            getByUID: jest.fn().mockResolvedValueOnce({
                uid: 'my-new-post',
                data: {
                    title: [{ type: 'heading', text: 'My New Post' }],
                    content: [{ type: 'paragraph', text: 'Post content' }]
                },
                last_publication_date: '04-01-2021'
            } as any)
        } as any)

        const response = await getStaticProps({
            params: {
                slug: 'my-new-post'
            }
        } as any)

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    post: {
                        slug: 'my-new-post',
                        title: 'My New Post',
                        content: '<p>Post content</p>',
                        updatedAt: '01 de abril de 2021'
                    }
                }
            })
        )
    })
})
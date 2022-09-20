import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type CreateNoteParams = {
  /** 文章属于的文集Id */
  collectionId: Scalars['String'];
  content: Scalars['String'];
  title: Scalars['String'];
};

export type GetNoteContentResponse = {
  __typename?: 'GetNoteContentResponse';
  content: Scalars['String'];
  /** 文章的标题 */
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNote: Scalars['String'];
  deleteNote: Scalars['String'];
  updateNote: Scalars['String'];
};


export type MutationCreateNoteArgs = {
  Data: CreateNoteParams;
};


export type MutationDeleteNoteArgs = {
  Id: Scalars['String'];
};


export type MutationUpdateNoteArgs = {
  Data: UpdateNoteParams;
};

export type Note = {
  __typename?: 'Note';
  /** 文章属于的文集Id */
  collectionId: Scalars['String'];
  /** 文章的最新内容 */
  content: Scalars['String'];
  /** 缓存的文章的内容 */
  contents?: Maybe<Array<NoteContent>>;
  createdAt: Scalars['DateTime'];
  creator: User;
  /** 文章的标题 */
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type NoteContent = {
  __typename?: 'NoteContent';
  /** 文章Markdown内容 */
  content: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  /** 文章版本，最多缓存10个版本 */
  version: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  content: GetNoteContentResponse;
  note: Note;
};


export type QueryContentArgs = {
  id: Scalars['String'];
};


export type QueryNoteArgs = {
  id: Scalars['String'];
};

export type UpdateNoteParams = {
  content: Scalars['String'];
  /** 文章的唯一Id */
  id: Scalars['String'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createTime: Scalars['DateTime'];
  /** UserId,自增 */
  id: Scalars['String'];
  name: Scalars['String'];
  nickname: Scalars['String'];
  password: Scalars['String'];
};

export type GetNoteConentQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetNoteConentQuery = { __typename?: 'Query', content: { __typename?: 'GetNoteContentResponse', title: string, updatedAt: any, content: string } };


export const GetNoteConentDocument = gql`
    query getNoteConent($id: String!) {
  content(id: $id) {
    title
    updatedAt
    content
  }
}
    `;

/**
 * __useGetNoteConentQuery__
 *
 * To run a query within a React component, call `useGetNoteConentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoteConentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoteConentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetNoteConentQuery(baseOptions: Apollo.QueryHookOptions<GetNoteConentQuery, GetNoteConentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoteConentQuery, GetNoteConentQueryVariables>(GetNoteConentDocument, options);
      }
export function useGetNoteConentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoteConentQuery, GetNoteConentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoteConentQuery, GetNoteConentQueryVariables>(GetNoteConentDocument, options);
        }
export type GetNoteConentQueryHookResult = ReturnType<typeof useGetNoteConentQuery>;
export type GetNoteConentLazyQueryHookResult = ReturnType<typeof useGetNoteConentLazyQuery>;
export type GetNoteConentQueryResult = Apollo.QueryResult<GetNoteConentQuery, GetNoteConentQueryVariables>;
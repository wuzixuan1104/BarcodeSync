/*
 * Book
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useEffect } from 'react';
import get from 'lodash/get';
import { useSuspenseQuery } from 'micro-graphql-react';
import MD5 from 'crypto-js/MD5';
import pdb from 'utils/historyPDB';
import { Wrapper, Block, Book, Code, Scan, Info } from './style';

const GET_IMAGES_QUERY = `
  query HomeModuleBooks(
    $page: Int
  ) {
    allBooks(
      SORT: { title: 1 },
      PAGE: $page,
      PAGE_SIZE: 50
    ) {
      Books{
        smallImage
      }
    }
  }
`;

export default function Books() {
  const [page] = useState(1);
  const [historyData, setHistoryData] = useState(null);
  const { data } = useSuspenseQuery(GET_IMAGES_QUERY, { page });

  useEffect(() => {
    initScan();
    detectScan();

    return () => { };
  }, []);

  const initScan = async () => {
    const recs = {};
    const docs = await pdb.getAllDoc();
    const rows = get(docs, 'rows');
    if (rows.length > 0) {
      rows.forEach(row => {
        const id = get(row, 'id');
        const scan = get(row, 'doc.data');

        if (id && scan !== null) {
          recs[id] = scan;
        }
      });
    }
    setHistoryData(recs);
  };

  const detectScan = () => {
    pdb.instance
      .changes({
        live: true,
        since: 'now',
      })
      .on('change', doc => {
        const id = get(doc, 'id');
        changeScan(id);
      })
      .on('error', error => console.error(error));
  };

  const changeScan = async key => {
    const data = await pdb.findDoc(key);
    setHistoryData(prev => ({ ...prev, [key]: data.data }));
  };

  const images = data.allBooks.Books.map(b => b.smallImage);
  const getCode = url => MD5(url).toString();

  return (
    <Wrapper>
      {historyData &&
        images &&
        images.map(img => {
          const code = getCode(img);
          const scan = get(historyData, code) || 0;

          return (
            <Block key={img}>
              <Book src={img} />
              <Info>
                <Code>{code}</Code>
                <Scan>
                  掃描：<span>{scan}</span>
                </Scan>
              </Info>
            </Block>
          );
        })}
    </Wrapper>
  );
}

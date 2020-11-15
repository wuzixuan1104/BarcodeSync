import PouchDB from 'pouchdb';
import get from 'lodash/get';

const version = 'v1.0.0';

const pdb = (dbname, remoteDB) => {
  /**
   * @description pouchDB
   * https://pouchdb.com/api.html#create_document
   */
  const RemoteDB = new PouchDB(remoteDB);
  let PDB = new PouchDB(dbname);

  /**
   * @description 初始化 db
   */
  const initPDB = async () => {
    PDB.sync(RemoteDB, {
      live: true,
    })
      .on('complete', () => {
        // yay, we're in sync!
        console.log('complete');
      })
      .on('error', err => {
        // boo, we hit an error!
        console.log('err', err);
      })
      .on('change', data => {
        // boo, we hit an error!
        console.log('change', data);
      });
  };

  /**
   * @description 存入 Doc，並檢查是否已存在就更新
   */
  const saveDoc = async (key, data) => {
    const content = await putDoc(key, data);
    return content;
  };

  /**
   * @description 取的 local Doc 資料
   * @param {String} key Api Name
   */
  const findDoc = key =>
    PDB.get(key)
      .then(doc => doc)
      .catch(() => false);

  /**
   * @description 存入 local Doc
   * @param {String} key Api Name
   */
  const putDoc = (key, data) =>
    PDB.get(key)
      .then(doc => {
        console.log('d', doc.data, data, doc.data + data);

        PDB.put({
          _id: key,
          _rev: get(doc, '_rev'), // 若資料已存在，必須加 _rev
          data: doc.data + data,
        }).then(() => true);
      })
      .catch(() =>
        PDB.put({
          _id: key,
          data,
        }).then(() => true),
      );

  /**
   * @description 刪除並重新建立 DB
   */
  const resetPDB = () => {
    PDB.destroy()
      .then(() => {
        PDB = new PouchDB(dbname);
        putDoc('version', { version });
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error('[pouchDB error] destroy DB', e);
      });
  };

  const getAllDoc = () =>
    PDB.allDocs(
      {
        include_docs: true,
      },
      (err, resp) => resp,
    );

  return { initPDB, saveDoc, findDoc, getAllDoc, instance: PDB };
};

export default pdb;

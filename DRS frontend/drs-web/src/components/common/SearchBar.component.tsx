import { ChangeEvent, Fragment, PropsWithChildren, useState } from 'react';
import { initialPageNo } from '../../consts/initialPageDetails';
import { ISearchBar } from '../../interfaces/components/common';
import { base64toBlobConverter, downloadBlob } from '../../utils/base64ToBlob';
import CommonFilter from './CommonFilter.component';

const SearchBar = <TFilterData extends object>({
  tableOptionsConfig,
  setSearchData,
  setPageNo,
  setFilterData,
  filterFields,
  filterValidationSchema,
  exportDetails,
}: PropsWithChildren<ISearchBar<TFilterData>>) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchData?.(event.target.value);
    setPageNo?.(initialPageNo);
  };

  const handleExport = async () => {
    const { contentType, downloadAs, refetch } = exportDetails!;
    const { data } = await refetch({
      cancelRefetch: true,
      throwOnError: false,
    });
    const blob = base64toBlobConverter(data?.body.base64!, contentType);
    downloadBlob(blob, downloadAs);
  };

  return (
    <Fragment>
      <div style={{ marginTop: '20px' }}></div>
      <input
        type='search'
        name='search'
        id='searchId'
        onChange={handleSearch}
      />
      <button onClick={() => setShowFilter((prev) => !prev)}>
        filter toggle
      </button>

      <button onClick={() => handleExport()}>export as pdf</button>

      {showFilter && (
        <CommonFilter<TFilterData>
          filterFields={filterFields!}
          filterValidationSchema={filterValidationSchema!}
          setFilterData={setFilterData!}
          setPageNo={setPageNo!}
        />
      )}
    </Fragment>
  );
};

export default SearchBar;

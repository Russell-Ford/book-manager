<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

use App\Http\Requests;
use App\Book;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $accounts = Book::take($request->displayPerPage)
                            ->skip($request->displayPerPage * $request->currentPage)
                            ->get();

        return $accounts;
    }

    public function lastPageIndex(Request $request)
    {
        $numRecords = count(Book::all());
        $lastPage = intdiv($numRecords, $request->displayPerPage);

        return $lastPage;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = $this->validateRequest($request);
        if($validator->fails()) {
            return response($validator->errors()->all());
        }
        Book::create($request->all());
        return response()->json(['success' => 'true']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = $this->validateRequest($request);
        if($validator->fails()) {
            return $validator->errors()->all();
        }
        $book = $request->except('id');
        Book::find($id)->update($book);
        return response()->json(['success' => 'true']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $book = Book::findorfail($id);
        if($book->issued == 0) {
            Book::destroy($id);
            return response()->json(['success' => 'true']);
        } else {
            return response("Cannot delete book entry while books are still issued.", 400)
                    ->header('Content-Type', 'text/plain');
        }
    }

    private function validateRequest(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'author' => 'required|alpha_num',
            'isbn' => ['required','digits:13', Rule::unique('books')->ignore($request->id)],
            'total' => 'required|numeric',
            'issued' => 'required|numeric',
            'publish_date' => 'required|date_format:"Y-m-d"',
            'category' => 'required|alpha'
        ]);
        return $validator;
    }
}

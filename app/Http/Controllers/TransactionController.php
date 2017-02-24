<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Transaction;
use App\Book;
use Carbon\Carbon;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $transactions = Transaction::all();

        return $transactions;
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
        $book = Book::findorfail($request->book_id);
        $updatedBook = $book->toArray();
        if( $updatedBook['issued'] + 1 <= $updatedBook['total'] ) {
            $transaction = $request->all();
            $transaction['date_issued'] = Carbon::now();
            $updatedBook['issued'] += 1;
            $book->update($updatedBook);
            Transaction::create($transaction);
        } else {
            return response("Number of books issued cannot be greater than total number of books", 500)
                    ->header('Content-Type', 'text/plain');
        }
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
        //
    }
    public function returnBook(Request $request, $id)
    {
        $book = Book::findorfail($request->book_id);
        $updatedBook = $book->toArray();
        $transaction = Transaction::findorfail($request->id);
        $updatedTransaction = $transaction->toArray();
        if( $updatedTransaction['date_returned'] == null ) {
            $updatedTransaction['date_returned'] = Carbon::now();
            $transaction->update($updatedTransaction);
            $updatedBook['issued'] -= 1;
            $book->update($updatedBook);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

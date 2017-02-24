<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Http\Requests;
use App\Transaction;
use App\Book;
use App\Account;
use Carbon\Carbon;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $transactions = Transaction::take($request->displayPerPage)
                                    ->skip($request->displayPerPage * $request->currentPage)
                                    ->orderBy('date_issued', 'desc')
                                    ->get();

        return $transactions;
    }

    public function pending(Request $request)
    {
        $transactions = Transaction::where('date_returned', null)
                                    ->take($request->displayPerPage)
                                    ->skip($request->displayPerPage * $request->currentPage)    
                                    ->get();

        return $transactions;
    }

    public function lastPageIndex(Request $request)
    {
        $numRecords = count(Transaction::all());
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
        $request->request->add(['date_issued' => Carbon::now()->toDateTimeString()]);
        $validator = $this->validateRequest($request);
        if($validator->fails()) {
            return $validator->errors()->all();
        }
        $book = Book::findorfail($request->book_id);
        Account::findorfail($request->account_id);
        if( $book->issued + 1 <= $book->total ) {
            $transaction = $request->all();
            $book->issued += 1;
            $book->update();
            Transaction::create($transaction);
            return response()->json(['success' => 'true']);
        } else {
            return response("Number of books issued cannot be greater than total number of books", 400)
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
        $validator = $this->validateRequest($request);
        if($validator->fails()) {
            return $validator->errors()->all();
        }
        $transaction = Transaction::findorfail($id);
        Account::findorfail($request->account_id);
        $transaction->update($request->all());
        return response()->json(['success' => 'true']);
    }
    public function returnBook(Request $request, $id)
    {
        $validator = $this->validateRequest($request);
        if($validator->fails()) {
            return $validator->errors()->all();
        }
        $book = Book::findorfail($request->book_id);
        $updatedBook = $book->toArray();
        $transaction = Transaction::findorfail($request->id);
        $updatedTransaction = $transaction->toArray();
        if( $updatedTransaction['date_returned'] == null ) {
            $updatedTransaction['date_returned'] = Carbon::now()->toDateTimeString();
            $transaction->update($updatedTransaction);
            $updatedBook['issued'] -= 1;
            $book->update($updatedBook);
            return response()->json(['success' => 'true']);
        } else {
            return response("Cannot return book that is already returned.", 400)
                    ->header('Content-Type', 'text/plain');
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

    private function validateRequest(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'account_id' => 'required|numeric|exists:accounts,id',
            'book_id' => 'required|numeric|exists:books,id',
            'date_issued' => 'required|date_format:"Y-m-d H:i:s"',
            'date_returned' => 'nullable|date_format:"Y-m-d H:i:s"'
        ]);
        return $validator;
    }
}

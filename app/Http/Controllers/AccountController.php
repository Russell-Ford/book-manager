<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

use App\Http\Requests;
use App\Account;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $accounts = Account::take($request->displayPerPage)
                            ->skip($request->displayPerPage * $request->currentPage)
                            ->get();

        return $accounts;
    }

    public function lastPageIndex(Request $request)
    {
        $numRecords = count(Account::all());
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
            return $validator->errors()->all();
        }
        Account::create($request->all());
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
        $test = $request->except('id');
        Account::find($id)->update($test);
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
        //
    }

    private function validateRequest(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|alpha_num',
            'last_name' => 'required',
            'email' => ['required','email',Rule::unique('accounts')->ignore($request->id)]
        ]);
        return $validator;
    }
}
